import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserDetails extends Document {
  userId: mongoose.Types.ObjectId;
  directorFirstName: string;
  directorLastName: string;
  contactPhone: string;
  contactEmail: string;
  abn: string;
  companyName: string;
  address: string;
  state: string;
  postcode: string;
  entityType: string;
  industryType: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserDetailsSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    directorFirstName: {
      type: String,
      required: [true, 'Director first name is required'],
      maxlength: [60, 'Director first name cannot be more than 60 characters'],
    },
    directorLastName: {
      type: String,
      required: [true, 'Director last name is required'],
      maxlength: [60, 'Director last name cannot be more than 60 characters'],
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone is required'],
      maxlength: [20, 'Contact phone cannot be more than 20 characters'],
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid contact email',
      ],
    },
    abn: {
      type: String,
      required: [true, 'ABN is required'],
      validate: {
        validator: function(v: string) {
          // Remove spaces and check if it's 11 digits
          return /^\d{11}$/.test(v.replace(/\s/g, ''));
        },
        message: 'ABN must be 11 digits',
      },
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      maxlength: [120, 'Company name cannot be more than 120 characters'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      maxlength: [200, 'Address cannot be more than 200 characters'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      enum: ['VIC', 'NSW', 'WA', 'QLD', 'NT', 'ACT', 'TAS', 'SA', 'NZ'],
    },
    postcode: {
      type: String,
      required: [true, 'Postcode is required'],
      maxlength: [10, 'Postcode cannot be more than 10 characters'],
    },
    entityType: {
      type: String,
      required: [true, 'Entity type is required'],
      enum: ['Private Company', 'Sole Trader', 'SMSF', 'Partnership', 'Trust', 'Public Company'],
    },
    industryType: {
      type: String,
      required: [true, 'Industry type is required'],
      enum: [
        'Accountant',
        'Lawyer',
        'Mortgage Broker',
        'Financial Planner',
        'Real Estate Agent',
        'Business Consultant',
        'IT Services',
        'Retail',
        'Hospitality',
        'Manufacturing',
        'Healthcare',
        'Construction',
        'Other',
      ],
    },
  },
  {
    timestamps: true,
  }
);

const UserDetails: Model<IUserDetails> =
  mongoose.models.UserDetails || mongoose.model<IUserDetails>('UserDetails', UserDetailsSchema);

export default UserDetails;
