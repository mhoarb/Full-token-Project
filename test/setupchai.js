"ude strict";

var chai = require("chai");

const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);


var chaiAsPromised = require("chai-as-promised");
const { myToken } = require("./MyToken.test");
chai.use(chaiAsPromised);
module.exports = chai;