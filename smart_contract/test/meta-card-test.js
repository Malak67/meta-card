const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MetaCard", () => {
  let Metacard;
  let metacardInstance;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    Metacard = await ethers.getContractFactory("MetaCard");
    metacardInstance = await Metacard.deploy();

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    console.log('Owner: ', owner.address);
    console.log('addr1: ', addr1.address);
    console.log('addr2: ', addr2.address);
    await metacardInstance.deployed();
  });

  describe("Deployment", () => {
    it('deploys successfully', async () => {
      const address = await metacardInstance.address
      expect(address).to.not.equal(0x0)
      expect(address).to.not.equal('')
      expect(address).to.not.equal(null)
      expect(address).to.not.equal(undefined)
    })

    it("Should return the new business card", async () => {
      const createBusinessCardTx = await metacardInstance.createBusinessCard("John Doe", "Full Stack Developer", "+1-202-555-0163");

      // wait until the transaction is mined
      await createBusinessCardTx.wait();
      const card = await metacardInstance.getBusinessCard();
      expect(card.fullName).to.equal("John Doe");
      expect(card.title).to.equal("Full Stack Developer");
      expect(card.phoneNumber).to.equal("+1-202-555-0163");

      const bizCardsCount = await metacardInstance.getBusinessCardsCount();
      expect(bizCardsCount.toNumber()).to.eq(1);

      const ownerCard = await metacardInstance.allBusinessCards(card.owner);
      expect(ownerCard.fullName).to.equal("John Doe");
    });

    it("Should update a business card", async () => {
      const createBusinessCardTx = await metacardInstance.createBusinessCard("John Doe", "Full Stack Developer", "+1-202-555-0163");
      await createBusinessCardTx.wait();

      const updateBusinessCardTx = await metacardInstance.updateBusinessCard("John Doe 2", "Solidity Developer", "+1-202-555-0164")
      await updateBusinessCardTx.wait();

      const card = await metacardInstance.getBusinessCard();
      expect(card.fullName).to.equal("John Doe 2");
      expect(card.title).to.equal("Solidity Developer");
      expect(card.phoneNumber).to.equal("+1-202-555-0164");
    });

    it("Should add a social link", async () => {
      const addSocialLinkTx1 = await metacardInstance.addSocialLink("LinkedIn", "https://linkedin.com");
      const addSocialLinkTx2 = await metacardInstance.addSocialLink("Facebook", "https://facebook.com");

      await addSocialLinkTx1.wait();
      await addSocialLinkTx2.wait();

      const socialLinksCount = await metacardInstance.getSocialLinksCount();
      expect(socialLinksCount.toNumber()).to.eq(2);

      const socialLinks = await metacardInstance.getSocialLinks();
      expect(socialLinks.length).to.eq(2);
    });

    it("Should update a social link", async () => {
      const addSocialLinkTx1 = await metacardInstance.addSocialLink("LinkedIn", "https://linkedin.com");
      const addSocialLinkTx2 = await metacardInstance.addSocialLink("Facebook", "https://facebook.com");
      await addSocialLinkTx1.wait();
      await addSocialLinkTx2.wait();

      const socialLinks = await metacardInstance.getSocialLinks();
      const id = socialLinks[0].id.toNumber();
      const updateSocialLinkTx = await metacardInstance.updateSocialLink(id, "LinkedIn 2", "https://linkedin.com/john-doe");
      await updateSocialLinkTx.wait();

      const updatedSocialLinks = await metacardInstance.getSocialLinks();
      expect(updatedSocialLinks[0].name).to.equal("LinkedIn 2");
      expect(updatedSocialLinks[0].link).to.equal("https://linkedin.com/john-doe");
    })

    it("Should delete a social link", async () => {
      const addSocialLinkTx1 = await metacardInstance.addSocialLink("LinkedIn", "https://linkedin.com");
      const addSocialLinkTx2 = await metacardInstance.addSocialLink("Facebook", "https://facebook.com");
      await addSocialLinkTx1.wait();
      await addSocialLinkTx2.wait();

      const socialLinks = await metacardInstance.getSocialLinks();
      expect(socialLinks.length).to.eq(2);

      const id = socialLinks[0].id.toNumber();
      const deleteSocialLinkTx1 = await metacardInstance.removeSocialLink(id);
      await deleteSocialLinkTx1.wait();

      const updatedSocialLinks = await metacardInstance.getSocialLinks();
      expect(updatedSocialLinks.length).to.eq(1);
    });

    it("Should add contacts", async () => {
      const createBusinessCardTx2 = await metacardInstance.connect(addr1).createBusinessCard("Jane Doe", "UI/UX Developer", "+1-202-555-0135");
      await createBusinessCardTx2.wait();
      const card2 = await metacardInstance.connect(addr1).getBusinessCard();
      expect(card2.fullName).to.equal("Jane Doe");

      const createBusinessCardTx3 = await metacardInstance.connect(addr2).createBusinessCard("Test User", "Project Manager", "+1-202-555-0186");
      await createBusinessCardTx3.wait();
      const card3 = await metacardInstance.connect(addr2).getBusinessCard();
      expect(card3.fullName).to.equal("Test User");

      const createBusinessCardTx1 = await metacardInstance.createBusinessCard("John Doe", "Full Stack Developer", "+1-202-555-0163");
      await createBusinessCardTx1.wait();
      const card = await metacardInstance.connect(owner).getBusinessCard();
      expect(card.fullName).to.equal("John Doe");

      console.log('Addresses: ', owner.address, card.owner)
      const bizCards = await metacardInstance.connect(owner).getBusinessCardByAddress(addr2.address);
      console.log('bizCards: ', bizCards);
    });
  });
});
