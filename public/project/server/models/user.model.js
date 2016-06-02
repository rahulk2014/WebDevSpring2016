var q = require("q");

module.exports = function(db,mongoose,FollowModel) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('songUser',UserSchema);

    //var FavoriteSchema = require("./favorites.schema.server.js")(mongoose);
    //var FavoriteModel = mongoose.model('favorite',FavoriteSchema);


    var api = {
        createUser:createUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findAllUsers:findAllUsers,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,

        ////Favorites
        //addUserFavorite:addUserFavorite,
        //getUserFavorite:getUserFavorite,
        //removeUserFavorite:removeUserFavorite,

        //playlist
        createPlaylist:createPlaylist,

        //follow
        addFriend:addFriend,
        findFriends:findFriends,
        findFollowers:findFollowers,
        removeFriend:removeFriend
        //updateFollower: updateFollower,
        //undoNotify:undoNotify
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

    //function updateFollower(uid){
    //    var deferred = q.defer();
    //    console.log("Inside Model update");
    //    console.log(uid);
    //    FollowModel.update({followerId:uid}, {notify: "yes"}, {multi: true},
    //        function(err, fuser) {
    //            if(err){
    //                deferred.reject(err);
    //            }else{
    //                console.log("updated ");
    //                deferred.resolve(fuser);
    //            }
    //
    //        }
    //    );
    //    return deferred.promise;
    //}
    //
    //function undoNotify(uName,fName){
    //    var deferred = q.defer();
    //    console.log("Inside Model undoNotify");
    //    console.log(uName);
    //    console.log(fName);
    //    FollowModel.update({userName : uName ,followerName : fName}, {notify: "no"},
    //        function(err, fuser) {
    //            if(err){
    //                deferred.reject(err);
    //            }else{
    //                console.log("updated ");
    //                deferred.resolve(fuser);
    //            }
    //
    //        }
    //    );
    //    return deferred.promise;
    //}

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

        //FollowModel.findOne({userId: userId ,followerId: fId},
        //    function(err, userFollower){
        //        if(err){
        //            deferred.reject(err);
        //        }
        //        else {
        //
        //            userFollower.resIds.splice(userFollower.resIds.indexOf(resId), 1);
        //            userFav.save(function (err, userFavObj) {
        //                if (err) {
        //
        //                    deferred.reject(err);
        //                }
        //                else {
        //                    removeHotel(resId);
        //                    deferred.resolve(userFavObj);
        //                }
        //            });
        //        }
        //    });
        //return deferred.promise;
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

    function addUserFavorite(userId,restaurant){
        var deferred = q.defer();
        console.log("Inside Model");
        console.log(userId);
        FavoriteModel.findOne({userId: userId},
            function(err, userFav){
                if(err){
                    deferred.reject(err);
                }
                else{
                    console.log(JSON.stringify(userFav));
                    var resId = restaurant.id;

                    if(userFav != null && userFav.resIds.indexOf(resId) == -1 ) {

                        userFav.resIds.push(resId);
                        userFav.save(function (err, userFavObj) {
                            if (err) {
                                deferred.reject(err);
                            } else {

                                storeHotel(restaurant);
                                deferred.resolve(userFavObj);
                            }
                        })
                    }
                    else{
                        deferred.resolve(null);
                    }

                }
            });
        return deferred.promise;
    }

    function getUserFavorite(userId){
        var deferred = q.defer();
        FavoriteModel.findOne({userId: userId},
            function(err, userFav){
                if(err){
                    deferred.reject(err);
                }
                else{
                    if(userFav === null || userFav.resIds == 0 ){
                        deferred.resolve(null);
                    }else{
                        console.log("user found");
                        console.log(userFav);
                        var finalUserFav = {};
                        RestaurantModel.find({ resId : { $in : userFav.resIds }},
                            function(err, favRes){
                                if(err){
                                    deferred.reject(err);
                                }
                                else
                                {
                                    console.log("favRes");
                                    console.log(favRes);
                                    finalUserFav = {
                                        userId : userFav.userId,
                                        resIds : userFav.resIds,
                                        resFav : favRes
                                    };
                                    deferred.resolve(finalUserFav);
                                }
                            });
                    }

                }
            });
        return deferred.promise;
    }


    function removeUserFavorite(userId, resId){
        var deferred = q.defer();

        FavoriteModel.findOne({userId: userId},
            function(err, userFav){
                if(err){
                    deferred.reject(err);
                }
                else {

                    userFav.resIds.splice(userFav.resIds.indexOf(resId), 1);
                    userFav.save(function (err, userFavObj) {
                        if (err) {

                            deferred.reject(err);
                        }
                        else {
                            removeHotel(resId);
                            deferred.resolve(userFavObj);
                        }
                    });
                }
            });
        return deferred.promise;
    }


    function storeHotel(hotel){
        var deferred = q.defer();
        console.log("Store hotel");
        console.log(hotel);
        RestaurantModel.findOne({resId: hotel.id},
            function (err,found){
                if(err){
                    deferred.reject(err);
                }
                else{
                    console.log("found hotel");
                    console.log(found);

                    if(found == null){

                        RestaurantModel.create({
                            resId: hotel.id,
                            name : hotel.name,
                            cuisines : hotel.cuisines,
                            currency : hotel.currency,
                            image : hotel.image,
                            location : hotel.location.address,
                            rating : hotel.rating.aggregate_rating

                        },function(err,hotel){
                            if(err){
                                console.log("hotel save error");
                                deferred.reject(err);
                            }else{
                                console.log("hotel saved");
                                console.log(hotel);
                                deferred.resolve(hotel);
                            }
                        });

                    }
                    else{
                        deferred.resolve(hotel);
                    }

                }

            });


        return deferred.promise;
    }

    function removeHotel(resId){
        var deferred = q.defer();
        console.log(resId);
        RestaurantModel.findOneAndRemove({ resId : resId },
            function(err,hotel){
                if(err){
                    console.log("hotel remove error");
                    deferred.reject(err);
                }else{
                    console.log("hotel remove");
                    console.log(hotel);
                    deferred.resolve(hotel);
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
        console.log("Inside User Model");
        UserModel.findById({_id:userId}, function(err,playlistsFound) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(playlistsFound);
            }
        });
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
            }
            else{
                //username: String,
                //    password: String,
                //    firstName: String,
                //    lastName: String,
                //    email: String,
                //    phones: String,
                //    review: [ReviewSchema],
                //    playlists:[Playlist],
                //    friends : [String]
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