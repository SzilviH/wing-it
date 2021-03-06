const pollsModel = require("../models/lib/polls.js");
const stageController = require("./stages.js");

exports.savePollToDB = async (req, res) => {
  let stageId = await stageController.saveStageToDB({body:
    { stageName: req.body.type,
      content: `Please fill in the ${req.body.type.toLowerCase()} poll.`,
      due_date: req.body.deadline,
      trip_id: req.body.tripId
    }
  });
  await pollsModel.savePollToDB(req.body.type, `${req.body.options}`, req.body.deadline, req.body.tripId, stageId);
};

exports.getPolls = async (req, res) => {
    let polls = await pollsModel.getPolls(req.query.tripId);
    res.send(polls)
};

exports.saveVotes = async (req, res) => {
    await pollsModel.saveVotes(req.body.tripId, req.body.pollId, req.body.userId, req.body.optionIds, req.body.stageId);
    res.send('ok')
};

exports.saveAsDone = async (req, res) => {
    await pollsModel.saveAsDone(req.body.tripId, req.body.userId, req.body.stageId);
    res.send('ok')
};

exports.getVotes = async (req, res) => {
    let votes = await pollsModel.getVotes(req.query.tripId);
    res.send(votes)
};
