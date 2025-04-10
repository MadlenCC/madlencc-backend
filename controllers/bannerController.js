const Banner = require('../models/Banner');

// Get banner
const getBanner = async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create({ bannerUrl: "" }); // prazno ako ne postoji
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update banner
const updateBanner = async (req, res) => {
  try {
    const { bannerUrl } = req.body;
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create({ bannerUrl });
    } else {
      banner.bannerUrl = bannerUrl;
      await banner.save();
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBanner, updateBanner };
