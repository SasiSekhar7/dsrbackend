const User = require('../models/User');

exports.validateOTPAndFetchUser = async (req, res) => {
    const { phoneNumber, enteredOTP } = req.body;
  
    try {
      // Find the user based on the provided phone number
      const user = await User.findOne({ phone_number: phoneNumber });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Validate the entered OTP against the stored OTP in the user document
      if (user.otp === enteredOTP) {
        // Clear the OTP after successful validation
        user.otp = undefined;
        await user.save();
  
        return res.json(user);
      } else {
        return res.status(401).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.editUserData = async (req, res) => {
  const { id, field, value } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user[field] = value;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUserDataField = async (req, res) => {
  const { id, field } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user[field] = undefined;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAllUserData = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete all entries
    user.name = undefined;
    user.phone_number = undefined;
    user.location = undefined;
    user.gender = undefined;
    user.dob = undefined;
    user.email_id = undefined;
    user.retail_category = undefined;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
