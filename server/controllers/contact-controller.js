const Contact = require('../models/contact-model');

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ msg: "Contact form submitted successfully" });
        
    } catch (error) {
        console.error("Error in contact form route:", error);
        return res.status(500).json({ msg: "message not delivered" });
    }
}

    module.exports = contactForm;