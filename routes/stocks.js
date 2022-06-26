const express = require('express');
const Company = require('../model/Company');
const User = require('../model/User');
const Router = express.Router();
//const producer = require('../kafka/producer');

Router.post('/getUser', async (req, res, next) => {
    console.log(req.body);
    try {
        if (req.body != null && req.body != undefined) {
            const query = User.find({ 'emailId': req.body.emailId }, async (err, user) => {
                if (err) {
                    res.send(err);
                }
                console.log("Mongo record " + user);
                res.status(200).json({ user: user });
            })
        }
    } catch (error) {
        next(error);
        res.status(500).json({ err: error });
    }

});

Router.post('/getCompanyStocks', async (req, res, next) => {
    console.log(req.body);
    try {
        const companies = [];
        if (req.body != null && req.body != undefined) {
            const query = (await Company.find({'companyCode':req.body.companyCode}, null, {sort: {date:-1}})).forEach((company) => {
                companies.push(company);
            }
            );
            console.log(companies);
            res.status(200).json({ companies: companies });
        }
    } catch (error) {
        next(error);
        res.status(500).json({ err: error });
    }
});

Router.post('/getAllCompanyStocks', async (req, res, next) => {
    console.log(req.body);
    try {
        const companies = [];
        if (req.body != null && req.body != undefined) {
            const query = (await Company.find({}, null, {sort: {date:-1}})).forEach((company) => {
                companies.push(company);
            }
            );
            console.log(companies);
            res.status(200).json({ companies: companies });
        }
    } catch (error) {
        next(error);
        res.status(500).json({ err: error });
    }

});

Router.post('/getAllUser', async (req, res, next) => {
    try {
        const allUser = [];
        const user = (await User.find()).forEach(user => {
            allUser.push(user);
        });
        console.log(allUser);
        res.status(200).json({ users: allUser });
    } catch (error) {
        next(error);
        res.status(500).json({ err: error });
    }
});

Router.post('/addCompany', async (req, res, next) => {
    try {
        if (req.body != null && req.body != undefined) {
            console.log("Add Company Stocks " + JSON.stringify(req.body));
            // producer(req.body.stockPrice).catch((err) => {
            //     console.error("error in producer: ", err)
            // })
            const post = new Company({
                companyCode: req.body.companyCode,
                companyName: req.body.companyName,
                date: req.body.date == null || req.body.date == "" || req.body.date == undefined ? Date.now() : req.body.date,
                stockPrice: req.body.stockPrice,
                logo: req.body.logo,
                emailId: req.body.emailId
            });
            post.save();
            res.send("Post stocks of the company");
        }
    } catch (error) {
        next(error);
        res.status(500).json({ err: error });
    }
});

Router.post('/addUser', async (req, res, next) => {
    try {
        if (req.body != null && req.body != undefined) {
            console.log("Add User " + JSON.stringify(req.body));
           const post = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                phoneNumber: req.body.phoneNumber,
                dateOfBirth: req.body.dateOfBirth,
                password: req.body.password,
                role: req.body.role,
                isLoggedIn: req.body.isLoggedIn,
                age: req.body.age
            });
            post.save();
            res.send("User Details updated sucessfully...");
        }
    } catch (error) {
        next(error);
        res.status(500).json({ err: error });
    }

});

module.exports = Router;