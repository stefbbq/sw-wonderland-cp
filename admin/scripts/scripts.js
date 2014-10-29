"use strict";

function md5cycle(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936), d = ff(d, a, b, c, k[1], 12, -389564586), 
    c = ff(c, d, a, b, k[2], 17, 606105819), b = ff(b, c, d, a, k[3], 22, -1044525330), 
    a = ff(a, b, c, d, k[4], 7, -176418897), d = ff(d, a, b, c, k[5], 12, 1200080426), 
    c = ff(c, d, a, b, k[6], 17, -1473231341), b = ff(b, c, d, a, k[7], 22, -45705983), 
    a = ff(a, b, c, d, k[8], 7, 1770035416), d = ff(d, a, b, c, k[9], 12, -1958414417), 
    c = ff(c, d, a, b, k[10], 17, -42063), b = ff(b, c, d, a, k[11], 22, -1990404162), 
    a = ff(a, b, c, d, k[12], 7, 1804603682), d = ff(d, a, b, c, k[13], 12, -40341101), 
    c = ff(c, d, a, b, k[14], 17, -1502002290), b = ff(b, c, d, a, k[15], 22, 1236535329), 
    a = gg(a, b, c, d, k[1], 5, -165796510), d = gg(d, a, b, c, k[6], 9, -1069501632), 
    c = gg(c, d, a, b, k[11], 14, 643717713), b = gg(b, c, d, a, k[0], 20, -373897302), 
    a = gg(a, b, c, d, k[5], 5, -701558691), d = gg(d, a, b, c, k[10], 9, 38016083), 
    c = gg(c, d, a, b, k[15], 14, -660478335), b = gg(b, c, d, a, k[4], 20, -405537848), 
    a = gg(a, b, c, d, k[9], 5, 568446438), d = gg(d, a, b, c, k[14], 9, -1019803690), 
    c = gg(c, d, a, b, k[3], 14, -187363961), b = gg(b, c, d, a, k[8], 20, 1163531501), 
    a = gg(a, b, c, d, k[13], 5, -1444681467), d = gg(d, a, b, c, k[2], 9, -51403784), 
    c = gg(c, d, a, b, k[7], 14, 1735328473), b = gg(b, c, d, a, k[12], 20, -1926607734), 
    a = hh(a, b, c, d, k[5], 4, -378558), d = hh(d, a, b, c, k[8], 11, -2022574463), 
    c = hh(c, d, a, b, k[11], 16, 1839030562), b = hh(b, c, d, a, k[14], 23, -35309556), 
    a = hh(a, b, c, d, k[1], 4, -1530992060), d = hh(d, a, b, c, k[4], 11, 1272893353), 
    c = hh(c, d, a, b, k[7], 16, -155497632), b = hh(b, c, d, a, k[10], 23, -1094730640), 
    a = hh(a, b, c, d, k[13], 4, 681279174), d = hh(d, a, b, c, k[0], 11, -358537222), 
    c = hh(c, d, a, b, k[3], 16, -722521979), b = hh(b, c, d, a, k[6], 23, 76029189), 
    a = hh(a, b, c, d, k[9], 4, -640364487), d = hh(d, a, b, c, k[12], 11, -421815835), 
    c = hh(c, d, a, b, k[15], 16, 530742520), b = hh(b, c, d, a, k[2], 23, -995338651), 
    a = ii(a, b, c, d, k[0], 6, -198630844), d = ii(d, a, b, c, k[7], 10, 1126891415), 
    c = ii(c, d, a, b, k[14], 15, -1416354905), b = ii(b, c, d, a, k[5], 21, -57434055), 
    a = ii(a, b, c, d, k[12], 6, 1700485571), d = ii(d, a, b, c, k[3], 10, -1894986606), 
    c = ii(c, d, a, b, k[10], 15, -1051523), b = ii(b, c, d, a, k[1], 21, -2054922799), 
    a = ii(a, b, c, d, k[8], 6, 1873313359), d = ii(d, a, b, c, k[15], 10, -30611744), 
    c = ii(c, d, a, b, k[6], 15, -1560198380), b = ii(b, c, d, a, k[13], 21, 1309151649), 
    a = ii(a, b, c, d, k[4], 6, -145523070), d = ii(d, a, b, c, k[11], 10, -1120210379), 
    c = ii(c, d, a, b, k[2], 15, 718787259), b = ii(b, c, d, a, k[9], 21, -343485551), 
    x[0] = add32(a, x[0]), x[1] = add32(b, x[1]), x[2] = add32(c, x[2]), x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
    return a = add32(add32(a, q), add32(x, t)), add32(a << s | a >>> 32 - s, b);
}

function ff(a, b, c, d, x, s, t) {
    return cmn(b & c | ~b & d, a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
    return cmn(b & d | c & ~d, a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function md51(s) {
    var i, n = s.length, state = [ 1732584193, -271733879, -1732584194, 271733878 ];
    for (i = 64; i <= s.length; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)));
    s = s.substring(i - 64);
    var tail = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    if (tail[i >> 2] |= 128 << (i % 4 << 3), i > 55) for (md5cycle(state, tail), i = 0; 16 > i; i++) tail[i] = 0;
    return tail[14] = 8 * n, md5cycle(state, tail), state;
}

function md5blk(s) {
    var i, md5blks = [];
    for (i = 0; 64 > i; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    return md5blks;
}

function rhex(n) {
    for (var s = "", j = 0; 4 > j; j++) s += hex_chr[n >> 8 * j + 4 & 15] + hex_chr[n >> 8 * j & 15];
    return s;
}

function hex(x) {
    for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
    return x.join("");
}

function md5(s) {
    return hex(md51(s));
}

function add32(a, b) {
    return a + b & 4294967295;
}

function add32(x, y) {
    var lsw = (65535 & x) + (65535 & y), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | 65535 & lsw;
}

var basePath = basePath || "", viewExt = viewExt || ".html";

angular.module("wplAdmin", [ "ngAnimate", "ngCookies", "ngResource", "ngRoute", "ngSanitize", "ui.mask", "angularFileUpload" ]).config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/listClients", {
        templateUrl: basePath + "views/listClients" + viewExt,
        controller: "ClientListCtrl"
    }).when("/addClient", {
        templateUrl: basePath + "views/editClient" + viewExt,
        controller: "EditClientCtrl"
    }).when("/editClient", {
        templateUrl: basePath + "views/editClient" + viewExt,
        controller: "EditClientCtrl"
    }).when("/addClientUser", {
        templateUrl: basePath + "views/editClientUser" + viewExt,
        controller: "EditClientUserCtrl"
    }).when("/editClientUser", {
        templateUrl: basePath + "views/editClientUser" + viewExt,
        controller: "EditClientUserCtrl"
    }).when("/clientDetail", {
        templateUrl: basePath + "views/clientDetail" + viewExt,
        controller: "ClientDetailCtrl"
    }).when("/clientUserDetail", {
        templateUrl: basePath + "views/clientUserDetail" + viewExt,
        controller: "ClientUserDetailCtrl"
    }).when("/addAdminUser", {
        templateUrl: basePath + "views/editAdminUser" + viewExt,
        controller: "EditAdminUserCtrl"
    }).when("/editAdminUser", {
        templateUrl: basePath + "views/editAdminUser" + viewExt,
        controller: "EditAdminUserCtrl"
    }).when("/changeAdminPassword", {
        templateUrl: basePath + "views/changeAdminPassword" + viewExt,
        controller: "ChangeAdminPasswordCtrl"
    }).when("/listAdminUsers", {
        templateUrl: basePath + "views/listAdminUsers" + viewExt,
        controller: "AdminListCtrl"
    }).when("/addCollateral", {
        templateUrl: basePath + "views/editCollateral" + viewExt,
        controller: "EditCollateralCtrl"
    }).when("/editCollateral", {
        templateUrl: basePath + "views/editCollateral" + viewExt,
        controller: "EditCollateralCtrl"
    }).when("/collateralDetail", {
        templateUrl: basePath + "views/collateralDetail" + viewExt,
        controller: "CollateralDetailCtrl"
    }).when("/listCollateral", {
        templateUrl: basePath + "views/listCollateral" + viewExt,
        controller: "CollateralListCtrl"
    }).when("/dropboxSetup", {
        templateUrl: basePath + "views/dropboxSetup" + viewExt,
        controller: "DropBoxSetupCtrl"
    }).when('/logout', {
      templateUrl: basePath + "views/logout" + viewExt,
      controller: 'LogoutCtrl'
    }).otherwise({
        redirectTo: "/listClients"
    });
} ]).run([ "$rootScope", "$location", "$cookieStore", function($rootScope, $location, $cookieStore) {
    if ($rootScope.adminData = $cookieStore.get("adminData"), void 0 === $rootScope.adminData || !$rootScope.adminData.isAdmin) return void (window.location.href = "./login.php");
    var forceStaging = true;
    switch ($location.host()) {
      case "wonderland-cp.stagebot.net":
        $rootScope.wsURL = "http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK", 
        $rootScope.wsUploadURL = "http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php", 
        $rootScope.wsDropboxURL = "http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php";
        break;

      case "bach":
        $rootScope.wsURL = "http://bach/wonderland-cp/webservice/WPLAdmin.php?callback=JSON_CALLBACK", 
        $rootScope.wsUploadURL = "http://bach/wonderland-cp/webservice/WPLAdmin.php", $rootScope.wsDropboxURL = "http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php", 
        forceStaging && ($rootScope.wsURL = "http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK");
        break;

      case "localhost":
        $rootScope.wsURL = "http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK", 
        $rootScope.wsUploadURL = "http://localhost:81/wonderlandws/WPLAdmin.php", $rootScope.wsDropboxURL = "http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php", 
        forceStaging && ($rootScope.wsURL = "http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK");
    }
    $rootScope.jsonHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    }, $rootScope.clientList = {
        pageSize: 10
    }, $rootScope.collateralList = {
        pageSize: 10
    }, $rootScope.collateralList = {
        pageSize: 3
    }, $rootScope.collateralList_full = {
        pageSize: 10
    }, $rootScope.getFormVars = function(model) {
        var result = {};
        for (var a in model) isNaN(Number(a)) && (result[a] = model[a]);
        return result;
    };
} ]).controller("MenuController", [ "$scope", function($scope) {
    $scope.getClass = function(path) {
        var urlPath = window.location.hash.substr(1);
        return urlPath === path ? "active" : "";
    };
} ]), angular.module("wplAdmin").factory("clientService", [ "$http", "$rootScope", function($http, $rootScope) {
    function loadList(startPage, active, callback) {
        var args = {
            action: "clientList",
            s: startPage,
            c: pageSize,
            a: active ? "1" : "0"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data.list, list);
            var count = result.data.count;
            callback(count);
        }).error(function(result) {
            console.log("error", result);
        });
    }
    function loadListAll(callback) {
        var args = {
            action: "clientListAll"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data.list, list);
            var count = result.data.count;
            callback(count);
        }).error(function(result) {
            console.log("error", result);
        });
    }
    function search(startPage, searchString, active, callback) {
        var args = {
            action: "clientSearch",
            s: startPage,
            c: pageSize,
            q: searchString,
            a: active ? "1" : "0"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data.list, list);
            var count = result.data.count;
            callback(count);
        }).error(function(result) {
            console.log("error", result);
        });
    }
    function save(client, action, onSuccess) {
        var params = client;
        params.action = action, $http.jsonp($rootScope.wsURL, {
            params: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function() {
            onSuccess();
        }).error(function(data) {
            console.log("error", data);
        });
    }
    function loadDetails(id, callback) {
        var args = {
            action: "clientDetail",
            q: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data, details), callback && callback(details);
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function deactivateClient(id, callback) {
        var args = {
            action: "deactivateClient",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function reactivateClient(id, callback) {
        var args = {
            action: "reactivateClient",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function loadCollateral() {}
    var pageSize = $rootScope.clientList.pageSize, list = [], details = {};
    return {
        loadList: loadList,
        loadListAll: loadListAll,
        list: list,
        search: search,
        save: save,
        loadDetails: loadDetails,
        loadCollateral: loadCollateral,
        deactivate: deactivateClient,
        reactivate: reactivateClient,
        details: details
    };
} ]), angular.module("wplAdmin").factory("clientUserService", [ "$http", "$rootScope", function($http, $rootScope) {
    function loadList(id, active, callback) {
        var args = {
            action: "clientUserList",
            id: id,
            a: active ? "1" : "0"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function(result) {
            angular.copy(result.data.list, list), callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function saveUser(user, action, onSuccess) {
        var params = user;
        params.action = action, $http.jsonp($rootScope.wsURL, {
            params: params,
            headers: $rootScope.jsonHeader
        }).success(function() {
            onSuccess && onSuccess();
        }).error(function(data) {
            console.log("error", data);
        });
    }
    function loadDetails(id, callback) {
        var args = {
            action: "clientUserDetail",
            id: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function(result) {
            console.log(result), angular.copy(result.data.user, userDetails), angular.copy(result.data.company, clientDetails), 
            callback && callback(userDetails);
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function deactivateUser(id, callback) {
        var args = {
            action: "deactivateClientUser",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function reactivateUser(id, callback) {
        var args = {
            action: "reactivateClientUser",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    var userDetails = {}, clientDetails = {}, list = [];
    return {
        loadList: loadList,
        list: list,
        loadDetails: loadDetails,
        user: userDetails,
        client: clientDetails,
        save: saveUser,
        deactivate: deactivateUser,
        reactivate: reactivateUser
    };
} ]), angular.module("wplAdmin").factory("adminUserService", [ "$http", "$rootScope", function($http, $rootScope) {
    function loadList(id, active, callback) {
        var args = {
            action: "adminUserList",
            id: id,
            a: active ? 1 : 0
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function(result) {
            angular.copy(result.data.list, list), callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function saveUser(user, action, onSuccess) {
        var params = user;
        params.action = action, $http.jsonp($rootScope.wsURL, {
            params: params,
            headers: $rootScope.jsonHeader
        }).success(function() {
            onSuccess && onSuccess();
        }).error(function(data) {
            console.log("error", data);
        });
    }
    function changePassword(payload, onSuccess) {
        var params = payload;
        params.action = "changeAdminPassword", $http.jsonp($rootScope.wsURL, {
            params: params,
            headers: $rootScope.jsonHeader
        }).success(function(data) {
            onSuccess && onSuccess(data);
        }).error(function(data) {
            console.log("error", data);
        });
    }
    function loadDetails(id, callback) {
        var args = {
            action: "adminUserDetail",
            id: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function(result) {
            console.log(result), angular.copy(result.data, userDetails), callback && callback(userDetails);
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function deactivateUser(id, callback) {
        var args = {
            action: "deactivateAdminUser",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function reactivateUser(id, callback) {
        var args = {
            action: "reactivateAdminUser",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: $rootScope.jsonHeader
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    var userDetails = {}, clientDetails = {}, list = [];
    return {
        loadList: loadList,
        list: list,
        loadDetails: loadDetails,
        user: userDetails,
        changePassword: changePassword,
        client: clientDetails,
        save: saveUser,
        deactivateUser: deactivateUser,
        reactivateUser: reactivateUser
    };
} ]);

var $ = $;

angular.module("wplAdmin").factory("collateralService", [ "$http", "$rootScope", "$upload", function($http, $rootScope, $upload) {
    function loadList(clientID, startPage, active, callback) {
        var args = {
            action: "collateralList",
            clientID: clientID,
            s: startPage,
            c: pageSize,
            a: active ? "1" : "0"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data.list, list);
            var count = result.data.count;
            callback(count);
        }).error(function(result) {
            console.log("error", result);
        });
    }
    function search(clientID, searchString, startPage, active, callback) {
        var args = {
            action: "collateralSearch",
            clientID: clientID,
            s: startPage,
            c: pageSize,
            q: searchString,
            a: active ? "1" : "0"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data.list, list), console.log(list);
            var count = result.data.count;
            callback(count);
        }).error(function(result) {
            console.log("error", result);
        });
    }
    function loadListFull(startPage, active, callback) {
        var args = {
            action: "collateralListFull",
            s: startPage,
            c: $rootScope.collateralList_full.pageSize,
            a: active ? "1" : "0"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data.list, list);
            var count = result.data.count;
            callback(count);
        }).error(function(result) {
            console.log("error", result);
        });
    }
    function searchAll(searchString, startPage, active, callback) {
        var args = {
            action: "collateralSearchFull",
            s: startPage,
            c: pageSize,
            q: searchString,
            a: active ? "1" : "0"
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data.list, list), console.log(list);
            var count = result.data.count;
            callback(count);
        }).error(function(result) {
            console.log("error", result);
        });
    }
    function save(collateral, action, onProgress, onSuccess) {
        console.log(collateral);
        var params = {
            id: collateral.guid,
            client_id: collateral.client_id,
            name: collateral.name,
            type: collateral.type,
            description: collateral.description
        };
        params.action = action, $http.jsonp($rootScope.wsURL, {
            params: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            var collateralID = result.data.id;
            uploadFile("thumb", collateralID, collateral.thumbFile, onProgress, function() {
                uploadFile("file", collateralID, collateral.file, onProgress, function() {
                    onSuccess();
                });
            });
        }).error(function(data) {
            console.log("error", data);
        });
    }
    function uploadFile(type, collateralID, file, onProgress, onComplete) {
        if (console.log("collateralID", collateralID), null == file) return void onComplete();
        console.log("uploadingFile");
        var url = $rootScope.wsUploadURL + "?action=upload" + ("thumb" == type ? "Thumb" : "File");
        $upload.upload({
            url: url,
            method: "POST",
            data: {
                id: collateralID
            },
            file: file
        }).progress(function(e) {
            onProgress && onProgress(e);
        }).success(function() {
            if (onComplete) onComplete();
        });
    }
    function loadDetails(id, callback) {
        var args = {
            action: "collateralDetail",
            id: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(result) {
            angular.copy(result.data, details), callback && callback(details);
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function deactivate(id, callback) {
        var args = {
            action: "deactivateCollateral",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function reactivate(id, callback) {
        var args = {
            action: "reactivateCollateral",
            guid: id
        };
        $http.jsonp($rootScope.wsURL, {
            params: args,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function() {
            callback && callback();
        }).error(function(err) {
            console.log("error", err);
        });
    }
    function loadCollateralTypes(callback) {
        var items = [];
        return items.push({
            id: "booklet",
            name: "Booklet"
        }), items.push({
            id: "leaflet",
            name: "Leaflet"
        }), items.push({
            id: "directMail",
            name: "Direct Mail"
        }), items.push({
            id: "poster",
            name: "Poster"
        }), items.push({
            id: "stationary",
            name: "Stationary"
        }), items.push({
            id: "businessCards",
            name: "Business Cards"
        }), items.push({
            id: "folder",
            name: "Folder"
        }), items.push({
            id: "packaging",
            name: "Packaging"
        }), items.push({
            id: "customBox",
            name: "Custom Box"
        }), items.push({
            id: "binder",
            name: "Binder"
        }), items.push({
            id: "hrRecruitment",
            name: "HR Recruitment"
        }), items.push({
            id: "largeFormat",
            name: "Large Format"
        }), items.push({
            id: "special_other",
            name: "Special / Other"
        }), angular.copy(items, types), callback && callback(items), items;
    }
    function getCollateralTypeLabel(key) {
        for (var items = loadCollateralTypes(), value = "", i = 0; i < items.length; i++) if (items[i].id === key) {
            value = items[i].name;
            break;
        }
        return value;
    }
    function saveToDropbox(collateral, file, onProgress, onComplete) {
        var url = $rootScope.wsDropboxURL + "?action=saveToDropbox";
        $upload.upload({
            url: url,
            method: "POST",
            data: {
                name: collateral.name
            },
            file: file
        }).progress(function(e) {
            onProgress && onProgress(e);
        }).success(function(data) {
            $("#server_response").html(data), onComplete();
        });
    }
<<<<<<< HEAD
    function getDropboxAuthURL(callback) {
      var args = {
            action: "getDBURL"
        };
      $http.jsonp($rootScope.wsURL, {
          params: args,
          header: {
              "Content-Type": "application/x-www-form-urlencoded"
          }
      }).success(function(result) {
          callback && callback(result);
      }).error(function(err) {
          console.log("error", err);
      });
    }

    function authorizeDropbox(authCode, callback) {
      var args = {
            action: "authorizeDropbox",
            c:authCode
        };
      $http.jsonp($rootScope.wsURL, {
          params: args,
          header: {
              "Content-Type": "application/x-www-form-urlencoded"
          }
      }).success(function(result) {
          callback && callback(result);
      }).error(function(err) {
          console.log("error", err);
      });
    }

    var pageSize = $rootScope.clientList.pageSize, list = [], details = {}, types = [];
    return {
        loadList: loadList,
        loadListFull: loadListFull,
        list: list,
        types: types,
        getCollateralTypeLabel: getCollateralTypeLabel,
        loadTypeList: loadCollateralTypes,
        search: search,
        searchAll: searchAll,
        save: save,
        loadDetails: loadDetails,
        deactivate: deactivate,
        reactivate: reactivate,
        details: details,
        saveToDropbox: saveToDropbox,
        getDropboxAuthURL: getDropboxAuthURL,
        authorizeDropbox: authorizeDropbox
    };
} ]), angular.module("wplAdmin").directive("capitalizeFirst", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (void 0 !== inputValue) {
                    var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substr(1);
                    return capitalized !== inputValue && (modelCtrl.$setViewValue(capitalized), modelCtrl.$render()), 
                    capitalized;
                }
                return "";
            };
            modelCtrl.$parsers.push(capitalize), capitalize(scope[attrs.ngModel]);
        }
    };
}).directive("capitalize", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (void 0 !== inputValue) {
                    var capitalized = inputValue.toUpperCase();
                    return capitalized !== inputValue && (modelCtrl.$setViewValue(capitalized), modelCtrl.$render()), 
                    capitalized;
                }
                return "";
            };
            modelCtrl.$parsers.push(capitalize), capitalize(scope[attrs.ngModel]);
        }
    };
}), angular.module("wplAdmin").directive("match", function() {
    return {
        require: "ngModel",
        restrict: "A",
        scope: {
            match: "="
        },
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch(function() {
                return ctrl.$pristine && angular.isUndefined(ctrl.$modelValue) || scope.match === ctrl.$modelValue;
            }, function(currentValue) {
                ctrl.$setValidity("match", currentValue);
            });
        }
    };
}), angular.module("wplAdmin").directive("pagerComplete", [ "$timeout", function($timeout) {
    return {
        link: function(scope) {
            scope.$last === !0 && $timeout(function() {
                scope.$emit("pagerComplete");
            });
        }
    };
} ]), angular.module("wplAdmin").filter("tel", function() {
    return function(tel) {
        if (!tel) return "";
        var value = tel.toString().trim(), areaCode = value.substr(0, 3), part1 = value.substr(2, 3), part2 = value.substr(6);
        return "(" + areaCode + ") " + part1 + "-" + part2;
    };
}), angular.module("wplAdmin").filter("cleanup", function() {
    return function(txt) {
        return txt ? txt.replace("\\", "") : "";
    };
});

var $ = $;

angular.module("wplAdmin").controller("SearchCtrl", [ "$scope", function($scope) {
    $scope.doSearch = function() {
        $scope.$emit("searchClients", 0, $scope.searchString);
    };
} ]).controller("ClientListCtrl", [ "$scope", "$http", "$location", "$rootScope", "clientService", function($scope, $http, $location, $rootScope, clientService) {
    function loadClientPage(_startPage) {
        startPage = _startPage, $scope.clientService.loadList(startPage, listActive, function(count) {
            $scope.$broadcast("clientResultsLoaded", count);
        });
    }
    function searchClients(_startPage, _searchString) {
        startPage = _startPage, searchString = _searchString, $scope.clientService.search(startPage, searchString, listActive, function(count) {
            $scope.$broadcast("clientResultsLoaded", count);
        });
    }
    $scope.companies = [], $scope.clientService = clientService, $scope.clientService.list = clientService.list;
    var searchString, startPage, listActive = !0, LIST_MODE__LIST = "list", LIST_MODE__SEARCH = "search", listMode = LIST_MODE__LIST;
    $scope.$on("loadClientPage", function(e, startPage) {
        loadClientPage(startPage);
    }), $scope.$on("searchClients", function(e, startPage, _searchString) {
        searchString = _searchString, void 0 === searchString || 0 === searchString.length ? loadClientPage(startPage) : searchClients(startPage, searchString);
    }), $scope.onAddClient = function() {
        $location.path("/addClient");
    }, $scope.showClient = function(guid) {
        $location.path("/clientDetail").search({
            id: guid
        });
    }, $scope.listActive = function(value) {
        listActive = value, listMode === LIST_MODE__SEARCH ? searchClients(0, searchString) : loadClientPage(0);
    }, $scope.getActiveClass = function(value) {
        return listActive === value ? "active" : void 0;
    }, loadClientPage(0);
} ]).controller("ClientListPager", [ "$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    function hilightCurrentPage() {
        $(".page-numbers a").removeClass("selected");
        var $item = $($(".page-numbers a")[pageIndex]);
        $item.addClass("selected");
    }
    var pageList = [], pageIndex = 0;
    $scope.pages = [], $scope.$on("clientResultsLoaded", function(e, recordCount) {
        var pageSize = $rootScope.clientList.pageSize, pageCount = Math.ceil(recordCount / pageSize), recordNum = 0;
        pageList.length = 0;
        for (var i = 0; pageCount > i; i++) pageList.push({
            num: i + 1,
            recordNum: recordNum
        }), recordNum += pageSize;
        angular.copy(pageList, $scope.pages);
    }), $scope.prevPage = function() {
        pageIndex > 0 && $scope.loadPage(pageIndex - 1);
    }, $scope.nextPage = function() {
        pageIndex < pageList.length - 1 && $scope.loadPage(pageIndex + 1);
    }, $scope.loadPage = function(index) {
        pageIndex = index;
        var data = pageList[index];
        $scope.$emit("loadClientPage", data.recordNum), hilightCurrentPage();
    }, $scope.$on("pagerComplete", function() {
        hilightCurrentPage();
    });
} ]), angular.module("wplAdmin").controller("EditClientCtrl", [ "$scope", "$http", "$location", "$rootScope", "clientService", function($scope, $http, $location, $rootScope, clientService) {
    function construct() {
        switch (initializeTestData(), $location.path()) {
          case "/addClient":
            addMode = !0, $scope.title = "Add New Client", action = "addClient", $scope.company.guid = "";
            break;

          case "/editClient":
            addMode = !1, $scope.title = "Edit Client", action = "updateClient", $scope.clientService = clientService, 
            loadClientDetails();
        }
    }
    function loadClientDetails() {
        var id = $location.search().id;
        $scope.clientService.loadDetails(id, function(details) {
            angular.copy(details, $scope.company);
        });
    }
    function initializeTestData() {
        testDataList.push(new Client("Oscorp", "norman.osborne@oscorp.com")), testDataList.push(new Client("Extensive Enterprises", "tomax@extensiveenterprises.com")), 
        testDataList.push(new Client("Daily Planet", "lois.lane@dailyplanet.com")), testDataList.push(new Client("Daily Bugle", "jjjameson@dailybugle.com"));
    }
    function Client(name, email) {
        var me = {};
        return me.name = name, me.address = "100 This St.", me.city = "Anytown", me.province = "ON", 
        me.postalCode = "H1H 1H1", me.email = email, me.phone1 = "5555555555", me.phone2 = "5555555556", 
        me.repEmail = "wplAccount@wpl.com", me;
    }
    var addMode, action;
    $scope.company = {}, $scope.save = function(client) {
        clientService.save(client, action, function() {
            var msg;
            addMode ? (msg = "company added", alert(msg), $location.path("/listClients")) : (msg = "company updated", 
            alert(msg), $location.path("/listClients"));
        });
    }, $scope.cancel = function() {
        window.history.back();
    };
    var testDataIndex = 0;
    $scope.autofill = function() {
        testDataList[testDataIndex++];
        angular.copy(testDataIndex, $scope.company), testDataIndex >= testDataList.length && (testDataIndex = 0);
    };
    var testDataList = [];
    construct();
} ]);

var $ = $;

angular.module("wplAdmin").controller("ClientDetailCtrl", [ "$scope", "$location", "clientService", "clientUserService", "collateralService", function($scope, $location, clientService, clientUserService, collateralService) {
    function construct() {
        setClientActiveStatus(!0), loadClientDetails(), loadClientUsers(), loadCollateralPage(0);
    }
    function loadClientDetails() {
        $scope.clientDetails = clientService.clientDetails, clientService.loadDetails(id, function(data) {
            setClientActiveStatus("1" === data.active);
        });
    }
    function loadClientUsers() {
        clientUserService.loadList(id, listActive, function() {});
    }
    function loadCollateralPage(_startPage) {
        startPage = _startPage, $scope.collateralService.loadList(id, startPage, listCollateralActive, function(count) {
            $scope.$broadcast("collateralResultsLoaded", count);
        });
    }
    function loadCollateralSearchPage(_startPage, _searchString) {
        startPage = _startPage, searchString = _searchString, $scope.collateralService.search(id, searchString, startPage, listCollateralActive, function(count) {
            $scope.$broadcast("collateralResultsLoaded", count);
        });
    }
    function setClientActiveStatus(value) {
        clientActive = value, $scope.activeStatusLabel = clientActive ? "Deactivate Client" : "Reactivate Client";
    }
    $scope.clientService = clientService, $scope.clientUserService = clientUserService, 
    $scope.collateralService = collateralService;
    var startPage, clientActive, listActive = !0, listCollateralActive = !0, searchString = null, id = $location.search().id;
    $scope.users = clientUserService.users, $scope.$on("loadCollateralPage", function(e, startPage) {
        loadCollateralPage(startPage);
    }), $scope.$on("searchCollateral", function(e, startPage, _searchString) {
        searchString = _searchString, void 0 === searchString || 0 === searchString.length ? loadCollateralPage(startPage) : loadCollateralSearchPage(startPage, _searchString);
    }), $scope.showCollateral = function(collateralID) {
        $location.path("/collateralDetail").search({
            id: collateralID,
            clientID: id
        });
    }, $scope.showClientUser = function(id) {
        $location.path("/clientUserDetail").search({
            id: id
        });
    }, $scope.editClient = function() {
        $location.path("editClient").search({
            id: id
        });
    }, $scope.changeActiveStatus = function() {
        clientActive ? confirm("Are you sure you want to deactivate this client?") && clientService.deactivate(id, function() {
            setClientActiveStatus(!1), alert("Client deactivated");
        }) : clientService.reactivate(id, function() {
            setClientActiveStatus(!0), alert("Client reactivated");
        });
    }, $scope.addUser = function() {
        $location.path("addClientUser").search({
            companyID: id
        });
    }, $scope.listActive = function(value) {
        listActive = value, loadClientUsers();
    }, $scope.getActiveClass = function(value) {
        return listActive === value ? "active" : void 0;
    }, $scope.listActiveCollateral = function(value) {
        listCollateralActive = value, loadCollateralPage(0);
    }, $scope.getActiveCollateralClass = function(value) {
        return listCollateralActive === value ? "active" : void 0;
    }, construct();
} ]).controller("CollateralSearchCtrl", [ "$scope", function($scope) {
    $scope.doSearch = function() {
        $scope.$emit("searchCollateral", 0, $scope.searchString);
    };
} ]).controller("CollateralPager", [ "$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    function hilightCurrentPage() {
        $(".page-numbers a").removeClass("selected");
        var $item = $($(".page-numbers a")[pageIndex]);
        $item.addClass("selected");
    }
    var pageList = [], pageIndex = 0;
    $scope.collateralPages = [], $scope.$on("collateralResultsLoaded", function(e, recordCount) {
        var pageSize = $rootScope.collateralList.pageSize, pageCount = Math.ceil(recordCount / pageSize), recordNum = 0;
        pageList.length = 0;
        for (var i = 0; pageCount > i; i++) pageList.push({
            num: i + 1,
            recordNum: recordNum
        }), recordNum += pageSize;
        angular.copy(pageList, $scope.collateralPages);
    }), $scope.prevCollateralPage = function() {
        pageIndex > 0 && $scope.loadPage(pageIndex - 1);
    }, $scope.nextCollateralPage = function() {
        pageIndex < pageList.length - 1 && $scope.loadPage(pageIndex + 1);
    }, $scope.loadCollateralPage = function(index) {
        pageIndex = index;
        var data = pageList[index];
        $scope.$emit("loadCollateralPage", data.recordNum), hilightCurrentPage();
    }, $scope.$on("pagerComplete", function() {
        hilightCurrentPage();
    });
} ]), angular.module("wplAdmin").controller("EditClientUserCtrl", [ "$scope", "$http", "$location", "$rootScope", "clientUserService", function($scope, $http, $location, $rootScope, clientUserService) {
    function construct() {
        switch (initializeTestData(), $location.path()) {
          case "/addClientUser":
            addMode = !0, $scope.title = "Add New Client User", action = "addClientUser";
            break;

          case "/editClientUser":
            addMode = !1, $scope.title = "Edit Client User", action = "updateClientUser", $scope.clientUserService = clientUserService, 
            loadClientUserDetails();
        }
    }
    function loadClientUserDetails() {
        var id = $location.search().id;
        $scope.clientUserService.loadDetails(id, function(details) {
            angular.copy(details, $scope.user);
        });
    }
    function initializeTestData() {
        testDataList.push(new ClientUser("Test", "User", "testUser@company.com"));
    }
    function ClientUser(firstName, lastName, email) {
        var me = {};
        return me.first_name = firstName, me.last_name = lastName, me.email = email, me.confirm_email = "confirmationEmail@company.com", 
        me.phone = "5555555555", me.phone2 = "5555555556", me;
    }
    var addMode, action, companyID = $location.search().companyID;
    $scope.form = {}, $scope.user = {}, $scope.save = function(user) {
        user = angular.copy($scope.user), user.company_id = companyID, clientUserService.save(user, action, function() {
            var msg;
            msg = addMode ? "user added" : "user updated", alert(msg), $location.path("clientDetail").search({
                id: companyID
            });
        });
    }, $scope.cancel = function() {
        window.history.back();
    };
    var testDataIndex = 0;
    $scope.autofill = function() {
        var testData = testDataList[testDataIndex++];
        angular.copy(testData, $scope.user), testDataIndex >= testDataList.length && (testDataIndex = 0);
    };
    var testDataList = [];
    construct();
} ]), angular.module("wplAdmin").controller("ClientUserDetailCtrl", [ "$scope", "$location", "clientUserService", function($scope, $location, clientUserService) {
    function construct() {
        setActiveStatus(!0);
    }
    function setActiveStatus(value) {
        active = value, $scope.activeStatusLabel = active ? "Deactivate User" : "Reactivate User";
    }
    $scope.clientUserService = clientUserService;
    var active, id = $location.search().id;
    $scope.details = clientUserService.details, clientUserService.loadDetails(id, function(data) {
        setActiveStatus("1" === data.active);
    }), $scope.showClient = function(id) {
        $location.path("/clientDetail").search({
            id: id
        });
    }, $scope.edit = function() {
        $location.path("/editClientUser").search({
            id: id,
            companyID: clientUserService.client.guid
        });
    }, $scope.resetPassword = function() {
        alert("Will generate a new password and email a reset link to the user's email address.");
    }, $scope.changeActiveStatus = function() {
        active ? confirm("Are you sure you want to deactivate this user?") && clientUserService.deactivate(id, function() {
            setActiveStatus(!1), alert("Client user deactivated");
        }) : clientUserService.reactivate(id, function() {
            setActiveStatus(!0), alert("Client user reactivated");
        });
    }, construct();
} ]), angular.module("wplAdmin").controller("EditAdminUserCtrl", [ "$scope", "$http", "$location", "$rootScope", "adminUserService", function($scope, $http, $location, $rootScope, adminUserService) {
    function construct() {
        switch ($location.path()) {
          case "/addAdminUser":
            addMode = !0, $scope.title = "Add New Admin User", action = "addAdminUser";
            break;

          case "/editAdminUser":
            addMode = !1, $scope.title = "Edit Admin User", action = "updateAdminUser", $scope.adminUserService = adminUserService, 
            loadAdminUserDetails();
        }
        $scope.isEditMode = !addMode;
    }
    
    $scope.activateLabel = function() {
      return $scope.user.active == '1' ? 'Deactivate' : 'Reactivate';
    };
    
    var activateMessage;
    $scope.toggleActive = function() {
    
      function onActiveStatusChanged() {
        alert(activateMessage);
        $location.path("listAdminUsers");
      }

      var performAction = false;
      if ($scope.user.active == '1') {
        performAction = confirm('Are you sure you want to deactivate \n"' + $scope.user.username + ' (' + $scope.user.email + ')"?\nThe user will be displayed in the "inactive" list.');
      } else {
        performAction = true;
      }
      
      if (performAction) {
        if ($scope.user.active == '1') {
          activateMessage = "User Deactivated";
          adminUserService.deactivateUser($scope.user.guid, onActiveStatusChanged);
        } else {
          activateMessage = "User Reactivated";
          adminUserService.reactivateUser($scope.user.guid, onActiveStatusChanged);
        }
        
      
      
      }
    };
    
    function loadAdminUserDetails() {
        var id = $location.search().id;
        $scope.adminUserService.loadDetails(id, function(details) {
            angular.copy(details, $scope.user);
        });
    }
    function initializeTestData() {
        testDataList.push(new AdminUser("admin", "admin@wpl.com"));
    }
    function AdminUser(username, email, guid) {
        var me = {};
        me.username = username;
        me.email = email;
        me.guid = guid;
        return me
    }
    var addMode, action;
    $scope.form = {}, $scope.user = {}, $scope.save = function(user) {
        user = angular.copy($scope.user), user.action = action, adminUserService.save(user, action, function() {
            var msg;
            msg = addMode ? "Admin user added" : "Admin user updated", alert(msg), $location.path("listAdminUsers");
        });
    }, $scope.cancel = function() {
        window.history.back();
    };
    var testDataIndex = 0;
    $scope.autofill = function() {
        var testData = testDataList[testDataIndex++];
        angular.copy(testData, $scope.user), testDataIndex >= testDataList.length && (testDataIndex = 0);
    };
    var testDataList = [];
    construct();
} ]), angular.module("wplAdmin").controller("EditCollateralCtrl", [ "$scope", "$http", "$location", "$rootScope", "$cookieStore", "$upload", "$timeout", "collateralService", "clientService", function($scope, $http, $location, $rootScope, $cookieStore, $upload, $timeout, collateralService, clientService) {
    function construct() {
        switch ($scope.clientService = clientService, $scope.collateralService = collateralService, 
        $location.path()) {
          case "/addCollateral":
            addMode = !0, $scope.title = "Add New Collateral", action = "addCollateral";
            break;

          case "/editCollateral":
            addMode = !1, $scope.title = "Edit Collateral", action = "updateCollateral", loadDetails();
        }
        loadClients(), loadTypes();
    }
    function loadClients() {
        $scope.clientService.loadListAll(function() {});
    }
    function loadTypes() {
        $scope.collateralService.loadTypeList(function() {});
    }
    function loadDetails() {
        var id = $location.search().id;
        $scope.collateralService.loadDetails(id, function(details) {
            angular.copy(details, $scope.collateral);
        });
    }
    function onProgress(e) {
        console.log("onProgress", e);
    }
    var addMode, action;
    $scope.fileReaderSupported = null != window.FileReader && (null == window.FileAPI || 0 != FileAPI.html5), 
    $scope.collateral = {}, $scope.thumb = {
        file: null,
        image: ""
    }, $scope.onThumbSelect = function($files) {
        var file = $files[0];
        if ($scope.thumb.file = file, $scope.collateral.thumbFile = $files[0], $scope.fileReaderSupported && file.type.indexOf("image") > -1) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            {
                (function(fileReader) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.thumb.image = e.target.result, $scope.$apply();
                        });
                    };
                })(fileReader);
            }
        }
    }, $scope.file = {
        file: null
    }, $scope.onFileSelect = function($files) {
        console.log("file", $files), $scope.collateral.file = $files[0], $scope.file.file = $files[0];
    }, $scope.filesSelected = function() {
        return null !== $scope.thumb.file;
    }, $scope.save = function() {
		showModal();
        collateralService.save($scope.collateral, action, onProgress, function() {
            var msg;
			hideModal();

            addMode ? (msg = "collateral added", alert(msg)) : (msg = "collateral updated", 
            alert(msg));
			window.history.back();
        });
    }, $scope.cancel = function() {
        window.history.back();
    };
    var testDataIndex = 0;
    $scope.autofill = function() {
        testDataList[testDataIndex++];
        angular.copy(testDataIndex, $scope.company), testDataIndex >= testDataList.length && (testDataIndex = 0);
    };
    var testDataList = [];
    construct();
} ]);

var $ = $;

angular.module("wplAdmin").controller("AdminListCtrl", [ "$scope", "$http", "$location", "$rootScope", "adminUserService", function($scope, $http, $location, $rootScope, adminUserService) {
    function construct() {
        loadPage(0);
    }
    function loadPage(_startPage) {
        startPage = _startPage, $scope.adminUserService.loadList(startPage, listActive, function() {});
    }
    $scope.users = [], $scope.adminUserService = adminUserService, $scope.adminUserService.list = adminUserService.list;
    var startPage, listActive = !0;
    $scope.onAddUser = function() {
        $location.path("/addAdminUser");
    }, $scope.showUser = function(guid) {
        $location.path("/editAdminUser").search({
            id: guid
        });
    }, $scope.listActive = function(value) {
        listActive = value, loadPage(0);
    }, $scope.getActiveClass = function(value) {
        return listActive === value ? "active" : void 0;
    }, construct();
} ]).controller("Pager", function($scope, $http, $rootScope) {
    function hilightCurrentPage() {
        $(".page-numbers a").removeClass("selected");
        var $item = $($(".page-numbers a")[pageIndex]);
        $item.addClass("selected");
    }
    var pageList = [], pageIndex = 0;
    $scope.pages = [], $scope.$on("clientResultsLoaded", function(e, recordCount) {
        var pageSize = $rootScope.clientList.pageSize, pageCount = Math.ceil(recordCount / pageSize), recordNum = 0;
        pageList.length = 0;
        for (var i = 0; pageCount > i; i++) pageList.push({
            num: i + 1,
            recordNum: recordNum
        }), recordNum += pageSize;
        angular.copy(pageList, $scope.pages);
    }), $scope.prevPage = function() {
        pageIndex > 0 && $scope.loadPage(pageIndex - 1);
    }, $scope.nextPage = function() {
        pageIndex < pageList.length - 1 && $scope.loadPage(pageIndex + 1);
    }, $scope.loadPage = function(index) {
        pageIndex = index;
        var data = pageList[index];
        $scope.$emit("loadClientPage", data.recordNum), hilightCurrentPage();
    }, $scope.$on("pagerComplete", function() {
        hilightCurrentPage();
    });
}), angular.module("wplAdmin").controller("ChangeAdminPasswordCtrl", [ "$scope", "$http", "$location", "$rootScope", "adminUserService", function($scope, $http, $location, $rootScope, adminUserService) {
    function construct() {
        initializeTestData(), adminUserService.loadDetails(id, function() {});
    }
    function initializeTestData() {
        testDataList.push(new PasswordSet("admin", "admin@wpl.com"));
    }
    function PasswordSet(oldPassword, newPassword) {
        var me = {};
        return me.old_password = oldPassword, me.password = newPassword, me;
    }
    $scope.adminUserService = adminUserService, $scope.form = {}, $scope.user = {};
    var id = $location.search().id;
    $scope.save = function() {
        var payload = angular.copy($scope.passwords);
        payload.old_password = md5(payload.old_password), payload.password = md5(payload.password), 
        payload.id = id, adminUserService.changePassword(payload, function(response) {
            var msg = response.message;
            alert(msg), response.success && $location.path("clientList");
        });
    };
    var testDataIndex = 0;
    $scope.autofill = function() {
        var testData = testDataList[testDataIndex++];
        angular.copy(testData, $scope.user), testDataIndex >= testDataList.length && (testDataIndex = 0);
    };
    var testDataList = [];
    construct();
} ]), angular.module("wplAdmin").controller("CollateralDetailCtrl", [ "$scope", "$location", "collateralService", "clientService", function($scope, $location, collateralService, clientService) {
    function construct() {
        setActiveStatus(!0), loadClientDetails(), loadCollateralDetails();
    }
    function loadClientDetails() {
        clientService.loadDetails(clientID, function() {});
    }
    function loadCollateralDetails() {
        collateralService.loadDetails(id, function(data) {
            setActiveStatus("1" === data.active);
            collateralService.getCollateralTypeLabel(data.type);
            collateralService.details.type = collateralService.getCollateralTypeLabel(data.type);
        });
    }
    function setActiveStatus(value) {
        active = value, $scope.activeStatusLabel = active ? "Deactivate" : "Reactivate";
    }
    $scope.collateralService = collateralService, $scope.clientService = clientService;
    var active, id = $location.search().id, clientID = $location.search().clientID;
    $scope.showClient = function(id) {
        $location.path("/clientDetail").search({
            id: id
        });
    }, $scope.edit = function() {
        console.log(clientService.details), $location.path("/editCollateral").search({
            id: id,
            companyID: clientService.details.guid
        });
    }, $scope.changeActiveStatus = function() {
        active ? confirm("Are you sure you want to deactivate this collateral?") && collateralService.deactivate(id, function() {
            setActiveStatus(!1), alert("Collateral deactivated");
        }) : collateralService.reactivate(id, function() {
            setActiveStatus(!0), alert("Collateral reactivated");
        });
    }, construct();
} ]);

var $ = $;

angular.module("wplAdmin").controller("CollateralListCtrl", [ "$scope", "$location", "collateralService", function($scope, $location, collateralService) {
    function construct() {
        loadCollateralPage(0);
    }
    function loadCollateralPage(_startPage) {
        startPage = _startPage, $scope.collateralService.loadListFull(startPage, listCollateralActive, function(count) {
            $scope.$broadcast("collateralResultsLoaded", count);
        });
    }
    function loadCollateralSearchPage(_startPage, _searchString) {
        startPage = _startPage, searchString = _searchString, $scope.collateralService.searchAll(searchString, startPage, listCollateralActive, function(count) {
            $scope.$broadcast("collateralResultsLoaded", count);
        });
    }
    $scope.collateralService = collateralService;
    var startPage, listCollateralActive = !0, searchString = null;
    $scope.$on("loadCollateralPage", function(e, startPage) {
        loadCollateralPage(startPage);
    }), $scope.$on("searchCollateral", function(e, startPage, _searchString) {
        searchString = _searchString, void 0 === searchString || 0 === searchString.length ? loadCollateralPage(startPage) : loadCollateralSearchPage(startPage, _searchString);
    }), $scope.showCollateral = function(collateralID, clientID) {
        $location.path("/collateralDetail").search({
            id: collateralID,
            clientID: clientID
        });
    }, $scope.listActiveCollateral = function(value) {
        listCollateralActive = value, loadCollateralPage(0);
    }, $scope.getActiveCollateralClass = function(value) {
        return listCollateralActive === value ? "active" : void 0;
    }, construct();
} ]).controller("CollateralSearchAllCtrl", [ "$scope", function($scope) {
    $scope.doSearch = function() {
        $scope.$emit("searchCollateral", 0, $scope.searchString);
    };
} ]).controller("CollateralAllPager", [ "$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    function hilightCurrentPage() {
        $(".page-numbers a").removeClass("selected");
        var $item = $($(".page-numbers a")[pageIndex]);
        $item.addClass("selected");
    }
    var pageList = [], pageIndex = 0;
    $scope.collateralPages = [], $scope.$on("collateralResultsLoaded", function(e, recordCount) {
        var pageSize = $rootScope.collateralList.pageSize, pageCount = Math.ceil(recordCount / pageSize), recordNum = 0;
        pageList.length = 0;
        for (var i = 0; pageCount > i; i++) pageList.push({
            num: i + 1,
            recordNum: recordNum
        }), recordNum += pageSize;
        angular.copy(pageList, $scope.collateralPages);
    }), $scope.prevCollateralPage = function() {
        pageIndex > 0 && $scope.loadPage(pageIndex - 1);
    }, $scope.nextCollateralPage = function() {
        pageIndex < pageList.length - 1 && $scope.loadPage(pageIndex + 1);
    }, $scope.loadCollateralPage = function(index) {
        pageIndex = index;
        var data = pageList[index];
        $scope.$emit("loadCollateralPage", data.recordNum), hilightCurrentPage();
    }, $scope.$on("pagerComplete", function() {
        hilightCurrentPage();
    });
<<<<<<< HEAD
} ]), angular.module("wplAdmin").controller("DropBoxSetupCtrl", [ "$scope", "$http", "$location", "$rootScope", "$upload", "$timeout", "collateralService", function($scope, $http, $location, $rootScope, $upload, $timeout, collateralService) {
    function construct() {
        $scope.collateralService = collateralService;
    }
    
    $scope.getAuthCode = function() {
      collateralService.getDropboxAuthURL(function(result) {
        $('#auth_step_1').hide();
        $('#auth_step_2').show();
        window.open(result.data, 'db_auth');
        
      });
    };

    $scope.authorizeDropbox = function() {
      collateralService.authorizeDropbox($scope.auth_code, function(result) {
      $scope.auth_token = result.data;
        $('#auth_step_2').hide();
        $('#auth_step_3').show();
      });
    };

    construct();
} ])
.controller('LogoutCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
  $cookieStore.remove('clientData');
  alert("You are now logged out.");
  location.href = './login.php';

}])
;

function showModal() {
	$('#modal').removeClass('hidden');
}

function hideModal() {
	$('#modal').addClass('hidden');
}

construct();
} ]);
