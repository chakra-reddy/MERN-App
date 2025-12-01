import mongoose from "mongoose";

const jobModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    requestedBy: {
      type: String,
      required: true,
      minlength: 3,
    },
    positions: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed"],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobModelSchema);
