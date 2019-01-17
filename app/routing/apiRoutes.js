let path = require("path");
let friendData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });
    app.post("/api/friends", function (req, res) {
        let userdata = req.body;
        let diffValue = 0;
        let bestFriend = null;

        for (let x = 0; x < friendData.length; x++) {
            diffValue = 0;
            for (let y = 0; y < friendData[x].scores.length; y++) {
                let friendScore = friendData[x].scores[y];
                let userScore = userdata.scores[y];
                
                diffValue += Math.abs(friendScore - userScore);
            }
            if (bestFriend === null || diffValue < bestFriend.diffValue) {
                bestFriend = friendData[x];
                bestFriend.diffValue = diffValue;
            }
        }
        friendData.push(userdata);
        res.json(bestFriend);

    });
};
