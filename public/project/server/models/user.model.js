var q = require("q");

module.exports = function(db,mongoose,FollowModel) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('songUser',UserSchema);

    var api = {
        createUser:createUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findAllUsers:findAllUsers,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,

        //playlist
        createPlaylist:createPlaylist,
        getPlaylists : getPlaylists,
        deleteplaylist : deleteplaylist,
        addToPlaylist : addToPlaylist,
        deleteSong : deleteSong,

        //follow
        addFriend:addFriend,
        findFriends:findFriends,
        findFollowers:findFollowers,
        removeFriend:removeFriend
    };

    return api;

    function addFriend(uid,username,friend){
        var deferred = q.defer();
        console.log("Inside Model add");
        console.log(friend.username);
        FollowModel.create(
            {
                userId      : uid,
                userName  : username,
                followerId  : friend._id,
                followerName : friend.username
            },function(err,follow){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(follow);
                }
            }
        );
        return deferred.promise;
    }

    function removeFriend(userId,fId) {
        var deferred = q.defer();
        console.log(userId);
        console.log(fId);
        FollowModel.findOneAndRemove({ $and : [{ 'userId' : userId },{ 'followerId' : fId }]},
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    console.log(users);
                    console.log("removed");
                    deferred.resolve(users);
                }
            });

        return deferred.promise;

    }

    function findFriends(uid){
        var deferred = q.defer();
        console.log("Inside Model");
        console.log(uid);
        FollowModel.find({userId:uid},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFollowers(uid){
        var deferred = q.defer();
        console.log("Inside Model");
        console.log(uid);
        FollowModel.find({followerId:uid},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createPlaylist(playlistName, user) {

        var deferred = q.defer();

        UserModel.findById({_id:user._id}, function(err,userFound){
            if(err){
                deferred.reject(err);
            }
            else{
                var newPL = {
                    playlistName : playlistName
                };
                userFound.playlists.push(newPL);
                userFound.save(function(err,userUpdated){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        console.log("model user updated playlist");
                        deferred.resolve(userUpdated);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function getPlaylists(userId) {
        var deferred = q.defer();
        console.log("Inside getplaylists");
        UserModel.findById({_id:userId}, function(err,userFound) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log("Success");
                deferred.resolve(userFound);
            }
        });
        return deferred.promise;
    }

    function addToPlaylist(userId,playlistId,newSong) {
        var deferred = q.defer();
        console.log("Inside addtoPlaylist: userModel");
        console.log("NEW SONG : " + newSong);
        console.log(userId);
        UserModel.findById(userId).then(
            function(user) {
                var playlistToUpdate = user.playlists.id(playlistId);
                console.log(playlistToUpdate);
                playlistToUpdate.playlistName = playlistToUpdate.playlistName;
                playlistToUpdate.songs.push(newSong);
                console.log(playlistToUpdate);
                user.save(function(err, user){
                    if(err) {
                        console.log("HERE LIES THE ERROR");
                        deferred.reject(err);
                    } else {
                        console.log("HERE IAM IN ADD TO PLAYLIST USER MODEL");
                        console.log(user);
                        deferred.resolve(user);
                    }
                });
            });
        return deferred.promise;
    }

    function deleteSong(playlistId, songId, userId) {
        var deferred = q.defer();
        console.log("In deleteplaylist");
        console.log(playlistId);
        UserModel.findById(userId).then(
            function(user) {
                user.playlists.id(playlistId).songs.id(songId).remove();
                user.save(function(err, user){
                    if(err) {
                        console.log("Error");
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user.playlists);
                        console.log("Success in deleteplaylist");
                    }
                });
            });

        return deferred.promise;
    }

    function deleteplaylist(playlistId, userId) {
        var deferred = q.defer();
        console.log("In deleteplaylist");
        console.log(playlistId);
        UserModel.findById(userId).then(
            function(user) {
                user.playlists.id(playlistId).remove();
                user.save(function(err, user){
                    if(err) {
                        console.log("Error");
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user.playlists);
                        console.log("Success in deleteplaylist");
                    }
                });
            });

        return deferred.promise;
    }

    function createUser(user){

        // use q to defer the response
        var deferred = q.defer();
        var fullUser = {};
        console.log("Inside User Model");
        console.log(JSON.stringify(user));
        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, newUser) {
            if(err){
                deferred.reject(err);
            }else{
                console.log("USER MODEL CREATE END");
                deferred.resolve(newUser);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId,user){
        console.log(user);
        var deferred = q.defer();

        UserModel.findById({_id:userId}, function(err,userFound){
            if(err){
                deferred.reject(err);
            } else {
                userFound.username = user.username;
                userFound.firstName = user.firstName;
                userFound.lastName = user.lastName;
                userFound.password = user.password;
                userFound.email = user.email;
                userFound.review = user.review;
                userFound.playlists = user.playlists;
                userFound.friends = user.friends;
                userFound.save(function(err,userUpdated){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(userUpdated);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId){
        var deferred = q.defer();
        UserModel.findByIdAndRemove({"_id": userId}, function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();

        UserModel.find(
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();

        UserModel.findById(userId,
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }


    function findUserByUsername(userName){
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {username: userName},

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }


};