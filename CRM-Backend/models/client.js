const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
  },
});

ClientSchema.virtual('id').get(function (params) {
  return this._id.toHexString()
});

ClientSchema.set('toJSON', {
  virtuals: true,
});

const Client = mongoose.model("Client", ClientSchema);

exports.Client = Client;
