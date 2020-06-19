const mongoose =  require('mongoose');

const PlayerSchema = new mongoose.Schema ([{
    name: String,
    points: String
}])



module.exports = mongoose.model('Player', PlayerSchema);
