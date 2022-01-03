//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MetaCard {
    uint256 cardsCount;
    uint256 contactsCount;
    uint256 socialLinksCount;

    struct SocialLink {
        uint256 id;
        string name;
        string link;
    }

    struct BusinessCard {
        uint256 id;
        address owner;
        string fullName;
        string title;
        string phoneNumber;
    }

    event CreateBusinessCard(
        uint256 id,
        address owner,
        string fullName,
        string title,
        string phoneNumber
    );

    event UpdateBusinessCard(
        address owner,
        string fullName,
        string title,
        string phoneNumber
    );

    event AddContact(address owner);
    event RemoveContact(address owner);

    event AddSocialLink(uint256 id, string name, string link);
    event UpdateSocialLink(uint256 id, string name, string link);
    event RemoveSocialLink(uint256 id);

    BusinessCard public businessCard;
    SocialLink[] public socialLinks;
    address[] public contacts;

    mapping(address => BusinessCard) public allBusinessCards;

    function createBusinessCard(
        string memory _fullName,
        string memory _title,
        string memory _phoneNumber
    ) public {
        cardsCount += 1;
        businessCard = BusinessCard(
            cardsCount,
            msg.sender,
            _fullName,
            _title,
            _phoneNumber
        );
        allBusinessCards[msg.sender] = BusinessCard(
            cardsCount,
            msg.sender,
            _fullName,
            _title,
            _phoneNumber
        );
        emit CreateBusinessCard(
            cardsCount,
            msg.sender,
            _fullName,
            _title,
            _phoneNumber
        );
    }

    function getBusinessCard() public view returns (BusinessCard memory) {
        return businessCard;
    }

    function getSocialLinks() public view returns (SocialLink[] memory) {
        return socialLinks;
    }

    function updateBusinessCard(
        string memory _fullName,
        string memory _title,
        string memory _phoneNumber
    ) public {
        BusinessCard memory _businessCard = businessCard;
        _businessCard.fullName = _fullName;
        _businessCard.title = _title;
        _businessCard.phoneNumber = _phoneNumber;
        businessCard = _businessCard;
        allBusinessCards[msg.sender] = _businessCard;
        emit UpdateBusinessCard(msg.sender, _fullName, _title, _phoneNumber);
    }

    function addSocialLink(string memory _name, string memory _link) public {
        socialLinksCount += 1;
        socialLinks.push(SocialLink(socialLinksCount, _name, _link));
        emit AddSocialLink(socialLinksCount, _name, _link);
    }

    function updateSocialLink(
        uint256 _id,
        string memory _name,
        string memory _link
    ) public {
        require(_id > 0);
        for (uint256 i = 0; i < socialLinks.length - 1; i++) {
            if (socialLinks[i].id == _id) {
                SocialLink memory _socialLink = socialLinks[i];
                _socialLink.name = _name;
                _socialLink.link = _link;
                socialLinks[i] = _socialLink;
                emit UpdateSocialLink(_id, _name, _link);
            }
        }
    }

    function removeSocialLink(uint256 _id) public {
        require(_id < socialLinks.length);
        for (uint256 i = 0; i < socialLinks.length - 1; i++) {
            if (socialLinks[i].id == _id) {
                delete socialLinks[i];
                socialLinks[i] = socialLinks[socialLinks.length - 1];
                socialLinks.pop();
                socialLinksCount -= 1;
                emit RemoveSocialLink(_id);
            }
        }
    }

    function addContact(address _contact) public {
        require(allBusinessCards[_contact].owner != address(0x0));
        contactsCount += 1;
        BusinessCard memory _contactBusinessCard = allBusinessCards[_contact];
        contacts.push(_contactBusinessCard.owner);
        emit AddContact(_contactBusinessCard.owner);
    }

    function removeContact(address _contact) public {
        require(allBusinessCards[_contact].owner != address(0x0));
        for (uint256 i = 0; i < contacts.length - 1; i++) {
            if (contacts[i] == _contact) {
                delete contacts[i];
                contacts[i] = contacts[contacts.length - 1];
                contacts.pop();
                contactsCount -= 1;
                emit RemoveContact(_contact);
            }
        }
    }

    function getBusinessCardByAddress(address _address)
        public
        view
        returns (BusinessCard memory)
    {
        require(allBusinessCards[_address].owner != address(0x0));
        BusinessCard memory _businessCard = allBusinessCards[_address];
        return _businessCard;
    }

    function getBusinessCardsCount() public view returns (uint256) {
        return cardsCount;
    }

    function getSocialLinksCount() public view returns (uint256) {
        return socialLinksCount;
    }

    function getContactsCount() public view returns (uint256) {
        return contactsCount;
    }

    function getAllContacts() public view returns (address[] memory) {
        return contacts;
    }
}
