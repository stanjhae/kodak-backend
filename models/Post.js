const mongoose = require('mongoose');

const REQUIRED = '{PATH} is required';

const PostSchema = new mongoose.Schema(
  {
    category: { type: String, default: '', required: REQUIRED },
    url: { type: String, default: '', required: REQUIRED },
    liked: { type: Boolean, default: false },
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

PostSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
PostSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Post', PostSchema);
