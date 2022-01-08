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
      const createBusinessCardTx = await metacardInstance.createBusinessCard("John Doe", "Full Stack Developer", "johnDoe@email.com", "+1-202-555-0163");
      // wait until the transaction is mined
      await createBusinessCardTx.wait();
      const card = await metacardInstance.getBusinessCard();
      expect(card.fullName).to.equal("John Doe");
      expect(card.title).to.equal("Full Stack Developer");
      expect(card.email).to.equal("johnDoe@email.com");
      expect(card.phoneNumber).to.equal("+1-202-555-0163");

      const bizCardsCount = await metacardInstance.getBusinessCardsCount();
      expect(bizCardsCount.toNumber()).to.eq(1);

      const ownerCard = await metacardInstance.allBusinessCards(card.owner);
      expect(ownerCard.fullName).to.equal("John Doe");
    });

    it("Should update a business card", async () => {
      const createBusinessCardTx = await metacardInstance.createBusinessCard("John Doe", "Full Stack Developer", "johnDoe@email.com", "+1-202-555-0163");
      await createBusinessCardTx.wait();

      const updateBusinessCardTx = await metacardInstance.updateBusinessCard("John Doe 2", "Solidity Developer", "johnDoe2@email.com", "+1-202-555-0164")
      await updateBusinessCardTx.wait();

      const card = await metacardInstance.getBusinessCard();
      expect(card.fullName).to.equal("John Doe 2");
      expect(card.title).to.equal("Solidity Developer");
      expect(card.email).to.equal("johnDoe2@email.com");
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
      const addSocialLinkTx3 = await metacardInstance.addSocialLink("Pinterest", "https://pinterest.com");
      const addSocialLinkTx4 = await metacardInstance.addSocialLink("Youtube", "https://youtube.com");
      const addSocialLinkTx5 = await metacardInstance.addSocialLink("Twitter", "https://twitter.com");
      await addSocialLinkTx1.wait();
      await addSocialLinkTx2.wait();
      await addSocialLinkTx3.wait();
      await addSocialLinkTx4.wait();
      await addSocialLinkTx5.wait();

      const socialLinks = await metacardInstance.getSocialLinks();
      const id = socialLinks[2].id.toNumber();
      const idTwitter = socialLinks[4].id.toNumber();
      const updateSocialLinkTx = await metacardInstance.updateSocialLink(id, "Pinterest 2", "https://pinterest.com/john-doe");
      const updateSocialLinkTx2 = await metacardInstance.updateSocialLink(idTwitter, "Twitter 2", "https://twitter.com/john-doe");
      await updateSocialLinkTx.wait();
      await updateSocialLinkTx2.wait();

      const updatedSocialLinks = await metacardInstance.getSocialLinks();

      expect(updatedSocialLinks[2].name).to.equal("Pinterest 2");
      expect(updatedSocialLinks[4].name).to.equal("Twitter 2");
      expect(updatedSocialLinks[2].link).to.equal("https://pinterest.com/john-doe");
      expect(updatedSocialLinks[4].link).to.equal("https://twitter.com/john-doe");
    })

    it("Should delete a social link", async () => {
      const addSocialLinkTx1 = await metacardInstance.addSocialLink("LinkedIn", "https://linkedin.com");
      const addSocialLinkTx2 = await metacardInstance.addSocialLink("Facebook", "https://facebook.com");
      const addSocialLinkTx3 = await metacardInstance.addSocialLink("Pinterest", "https://pinterest.com");
      const addSocialLinkTx4 = await metacardInstance.addSocialLink("Youtube", "https://youtube.com");
      const addSocialLinkTx5 = await metacardInstance.addSocialLink("Twitter", "https://twitter.com");
      await addSocialLinkTx1.wait();
      await addSocialLinkTx2.wait();
      await addSocialLinkTx3.wait();
      await addSocialLinkTx4.wait();
      await addSocialLinkTx5.wait();

      const socialLinks = await metacardInstance.getSocialLinks();
      expect(socialLinks.length).to.eq(5);

      const id = socialLinks[3].id.toNumber();

      const deleteSocialLinkTx1 = await metacardInstance.removeSocialLink(id);
      await deleteSocialLinkTx1.wait();

      const updatedSocialLinks = await metacardInstance.getSocialLinks();

      expect(updatedSocialLinks.length).to.eq(4);

      const id2 = updatedSocialLinks[2].id.toNumber();

      const deleteSocialLinkTx2 = await metacardInstance.removeSocialLink(id2);
      await deleteSocialLinkTx2.wait();

      const updatedSocialLinks2 = await metacardInstance.getSocialLinks();
      expect(updatedSocialLinks2.length).to.eq(3);

      const addSocialLinkTx6 = await metacardInstance.addSocialLink("Instagram", "https://Instagram.com");
      await addSocialLinkTx6.wait();

      const updatedSocialLinks3 = await metacardInstance.getSocialLinks();
      expect(updatedSocialLinks3.length).to.eq(4);
     
      const publicSocialLinks = await metacardInstance.getSocialLinksByAddress(owner.address);
      expect(publicSocialLinks.length).to.eq(4);

    });

    it("Should add contacts and remove one contact", async () => {
      const createBusinessCardTx2 = await metacardInstance.connect(addr1).createBusinessCard("Jane Doe", "UI/UX Developer", "janeDoe@email.com", "+1-202-555-0135");
      await createBusinessCardTx2.wait();
      const card2 = await metacardInstance.connect(addr1).getBusinessCard();
      expect(card2.fullName).to.equal("Jane Doe");

      const createBusinessCardTx3 = await metacardInstance.connect(addr2).createBusinessCard("Test User", "Project Manager", "testUser@email.com", "+1-202-555-0186");
      await createBusinessCardTx3.wait();
      const card3 = await metacardInstance.connect(addr2).getBusinessCard();
      expect(card3.fullName).to.equal("Test User");

      const createBusinessCardTx1 = await metacardInstance.createBusinessCard("John Doe", "Full Stack Developer", "johnDoe@email.com", "+1-202-555-0163");
      await createBusinessCardTx1.wait();
      const card = await metacardInstance.connect(owner).getBusinessCard();
      expect(card.fullName).to.equal("John Doe");

      const addContactTx1 = await metacardInstance.connect(owner).addContact(addr1.address);
      const addContactTx2 = await metacardInstance.connect(owner).addContact(addr2.address);
      await addContactTx1.wait();
      await addContactTx2.wait();

      const contacts = await metacardInstance.connect(owner).getAllContacts();
      expect(contacts.length).to.eq(2);

      const contactsCount1 = await metacardInstance.getContactsCount();
      expect(contactsCount1).to.eq(2);

      const contactCard = await metacardInstance.connect(owner).getBusinessCardByAddress(addr2.address);
      expect(contactCard.fullName).to.equal("Test User");

      const removeContactTx1 = await metacardInstance.connect(owner).removeContact(addr1.address);
      await removeContactTx1.wait();

      const updatedContacts = await metacardInstance.connect(owner).getAllContacts();
      expect(updatedContacts.length).to.eq(1);

      const contactsCount2 = await metacardInstance.getContactsCount();
      expect(contactsCount2).to.eq(1);
    });
  });
});
