const { PrismaClient } = require('../generated/client_v2'); // ✅ correct client
const prisma = new PrismaClient();
 
exports.getCityDetails = async (req, res) => {
  try {
    const { name } = req.query;
 
    if (!name) {
      return res.status(400).json({ error: 'City name is required' });
    }
 
    // ✅ Use Prisma model instead of raw query
    const city = await prisma.cityMaster.findFirst({
      where: {
        cityName: {
          equals: name,
          mode: 'insensitive', // case-insensitive match
        },
      },
      include: {
        state: true,   // includes state relation for stateName
        country: true, // includes country relation for countryName
      },
    });
 
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
 
    res.json({
      city: city.cityName,
      state: city.state?.stateName || '',
      country: city.country?.countryName || '',
      pincode: city.pincode || '',
    });
 
  } catch (err) {
    console.error('Error fetching city details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};