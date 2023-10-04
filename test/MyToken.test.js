const Token = artifacts.require("MyToken");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path : "../.env"})

contract("Token Test", async (accounts) =>{

    const [deployerAccount , recipient , anotherAccount] = accounts;
    beforeEach( async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
        
    })

    it("all token should be in my account",async() =>{

        let instance =this.myToken;
        let totalSupply =  await instance.totalSupply();

       return await expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);

    });

    it("is possible to send tokens between accounts" , async() =>{

        const sendTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient,sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return await expect(instance.balanceOf(recipient)).to.eventually.a.bignumber.equal(new BN(sendTokens));



    });


    it("is not possible to send more tokens then avalaible in total" ,async() => {

        let instance = await this.myToken;
        let balanceOfDeployer =await instance.balanceOf(deployerAccount);
        
        await expect(instance.transfer(recipient , new BN(balanceOfDeployer+1))).to.be.eventually.be.rejected;

        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);


    });
    

    
});

 



