const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');

class MongoDbManager {
    constructor(uri) {
        this.uri = uri;
        this.client = new MongoClient(uri);
        this.database = this.client.db("SportsMe");
        this.user_info = this.database.collection("user_info");
        this.saltRounds = 5;
    }

    async sendPing() {
        try {
            await this.client.connect();
            await this.client.db("admin").command({ping: 1});
            console.log("Pinged Mongodb Deployement Successflly!");
        }

        catch (error) {
            console.log("Error with connecting to the mongodb database!");
            console.log(error);
        }
        finally {
            await this.client.close();
        }
        
    }
    async addUser(email, password, user) {
        let success = false;
        let hashPassword = await bcrypt.hash(password, this.saltRounds);
        let message = "";
        const doc = {
            email: email,
            password: hashPassword,
            user: user
          }
          //console.log("Hashed password");
          //console.log(hashPassword);


        if (hashPassword) {
            try {
                await this.client.connect();
                //check if user's email doesn't exist already
                const data = await this.user_info.findOne({email: email});
                if(data) {
                    //console.log("It exists");
                    message = "This email already has an account. Please login.";
                    success = false;
                }
                else {
                    await this.user_info.insertOne(doc)
                    .then(respone => {
                        //console.log("success entering info to database");
                        message = "Succesfully registered!";
                        success = true;
                    })
                    .catch(e => {
                        //console.log(`Error entering info to database {e}`);
                        message = "Error entering info to database";
                        //console.log(e);
                        success = false;
                    });
                }
            
            }
            catch (error) {
                console.log("ERROR adding user to database.");
                console.log(error);
                message = "Error entering info to database";
                success = false;
            }
        finally {
                await this.client.close();
            }
        }
        
        return {message: message, success: success};

    }

    async validateUser(email, password) {
        let success = false
        let message = "";
            try {
                await this.client.connect();
                const data = await this.user_info.findOne({email : email});
                if(data) {
                    let cmp = await bcrypt.compare(password, data['password']);
                    if(cmp) {
                        success = true;
                        //console.log("Passwords match");
                        //console.log("Below is the data of the user from the database.");
                        //console.log(data);
                        message = "Succesfully Logged In";
                    }
                    else {
                        //console.log("Wrong password");
                        success = false;
                        message = "Wrong Password!";

                    }

                }
                else {
                    //console.log("Email doesn't exist");
                    success = false;
                    message = "Email doesn't exist!";
                }
            }
            catch (error) {
                console.log("ERROR seraching for user in mongodb database.");
                console.log(error);
                success = false;
                message = "ERROR with seraching for user in mongodb database!";
            }
            finally {
                await this.client.close();
            }
        
          

            return {message: message, success: success};
    }


    

}

module.exports = MongoDbManager;