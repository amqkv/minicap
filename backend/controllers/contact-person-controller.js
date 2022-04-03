const { QueryTypes, Sequelize } = require("sequelize");
const ContactPerson = require("../models/contact-person");
const Patient = require("../models/patient");
const db = require("../config/database");
const emailSender = require("../utils/email-sender");
const constants = require("../utils/constants");

async function postTrackContacts(req, res) {
    try {
        const { PatientId } = await Patient.findOne({
            raw: true,
            where: { User_AccountId: req.params.id },
        });
        req.body.contacts.map(async contact => {
            await ContactPerson.create({
                DateOfContact: contact.dateOfContact,
                FirstName: contact.firstName,
                LastName: contact.lastName,
                Email: contact.email,
                Telephone: contact.phoneNumber,
                Patient_PatientId: PatientId,
            });
        });
        res.status(200).json(true);
    } catch {
        res.status(400).json(false);
    }
}

async function getTrackContacts(req, res) {
    try {
        // very simple essam query that queries the patients that filled the form, their first and last name, and their number of contact person
        const patientList = await db.query(
            `SELECT U.FirstName as firstName, U.LastName as lastName, COUNT(C.Patient_PatientId) as number, P.patientId as id
            FROM Users U, ContactPerson C, Patient P
            WHERE U.AccountId IN (
                SELECT P.User_AccountId
                FROM ContactPerson C, Patient P
                WHERE C.Patient_PatientId = P.PatientId)
            AND C.Patient_PatientId = P.PatientId AND U.AccountId = P.User_AccountId
            GROUP BY C.Patient_PatientId, U.FirstName, U.LastName, P.patientId`,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );

        res.status(200).json(patientList);
    } catch {
        res.status(400).json([]);
    }
}

async function getTrackContactsId(req, res) {
    try {
        const contacts = await ContactPerson.findAll({
            attributes: [
                [Sequelize.col("FirstName"), "firstName"],
                [Sequelize.col("LastName"), "lastName"],
                [Sequelize.col("Email"), "email"],
                [Sequelize.col("Telephone"), "phoneNumber"],
                [Sequelize.col("DateOfContact"), "dateOfContact"],
            ],
            where: {
                Patient_PatientId: req.params.id,
            },
        });

        res.status(200).json(contacts);
    } catch {
        res.status(400).json([]);
    }
}

async function deleteTrackContacts(req, res) {
    try {
        await ContactPerson.destroy({
            attributes: [
                [Sequelize.col("FirstName"), "firstName"],
                [Sequelize.col("LastName"), "lastName"],
                [Sequelize.col("Email"), "email"],
                [Sequelize.col("Telephone"), "phoneNumber"],
                [Sequelize.col("DateOfContact"), "dateOfContact"],
            ],
            where: {
                Patient_PatientId: req.body.id,
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                Email: req.body.email,
                Telephone: req.body.phoneNumber,
                DateOfContact: req.body.dateOfContact,
            },
        });
        res.status(200).json(true);
    } catch {
        res.status(400).json(false);
    }
}

async function sendEmail(req, res) {
    const patientName = await db.query(
        `SELECT U.FirstName as firstName, U.LastName as lastName
            FROM Users U, Patient P
            WHERE U.AccountId = P.User_AccountId AND P.PatientId = ${req.body.id}`,
        {
            raw: true,
            type: QueryTypes.SELECT,
        }
    );

    const mailOptions = {
        from: constants.ADMIN_EMAIL_ACCOUNT,
        to: req.body.email,
        subject: `COVID-19 Contact `,
        html: `<h1>Hi ${req.body.firstName} ${req.body.lastName},</h1> 
            <br> <h2>Unfortunately, you were in contact with ${patientName[0].firstName} ${patientName[0].lastName} on ${req.body.dateOfContact}. You can sign up to ${constants.WEBSITE_NAME} for free consultation with a doctor.</h2>`,
    };

    emailSender.emailTransporter.sendMail(mailOptions, error => {
        if (error) {
            res.status(400).json(false);
        } else {
            ContactPerson.destroy({
                attributes: [
                    [Sequelize.col("FirstName"), "firstName"],
                    [Sequelize.col("LastName"), "lastName"],
                    [Sequelize.col("Email"), "email"],
                    [Sequelize.col("Telephone"), "phoneNumber"],
                    [Sequelize.col("DateOfContact"), "dateOfContact"],
                ],
                where: {
                    Patient_PatientId: req.body.id,
                    FirstName: req.body.firstName,
                    LastName: req.body.lastName,
                    Email: req.body.email,
                    Telephone: req.body.phoneNumber,
                    DateOfContact: req.body.dateOfContact,
                },
            }).then(() => res.status(200).json(true));
        }
    });
}

module.exports = {
    postTrackContacts,
    getTrackContacts,
    getTrackContactsId,
    deleteTrackContacts,
    sendEmail,
};
