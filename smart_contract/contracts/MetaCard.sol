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
        address owner;
        uint256 id;
        string fullName;
        string title;
        string email;
        string phoneNumber;
    }

    event CreateBusinessCard(
        address indexed _owner,
        uint256 id,
        string fullName,
        string title,
        string email,
        string phoneNumber
    );

    event UpdateBusinessCard(
        address indexed _owner,
        string fullName,
        string title,
        string email,
        string phoneNumber
    );

    event AddContact(address owner, address contactAddress);
    event RemoveContact(address owner, address contactAddress);

    event AddSocialLink(
        address indexed _owner,
        uint256 id,
        string name,
        string link
    );
    event UpdateSocialLink(
        address indexed _owner,
        uint256 id,
        string name,
        string link
    );
    event RemoveSocialLink(address indexed _owner, uint256 id);

    mapping(address => BusinessCard) public allBusinessCards;
    mapping(address => SocialLink[]) public socialLinks;
    mapping(address => address[]) public contacts;

    function createBusinessCard(
        string memory _fullName,
        string memory _title,
        string memory _email,
        string memory _phoneNumber
    ) public {
        cardsCount += 1;
        allBusinessCards[msg.sender] = BusinessCard(
            msg.sender,
            cardsCount,
            _fullName,
            _title,
            _email,
            _phoneNumber
        );
        emit CreateBusinessCard(
            msg.sender,
            cardsCount,
            _fullName,
            _title,
            _email,
            _phoneNumber
        );
    }

    function getBusinessCard() public view returns (BusinessCard memory) {
        return allBusinessCards[msg.sender];
    }

    function getSocialLinks() public view returns (SocialLink[] memory) {
        return socialLinks[msg.sender];
    }

    function updateBusinessCard(
        string memory _fullName,
        string memory _title,
        string memory _email,
        string memory _phoneNumber
    ) public {
        BusinessCard memory _businessCard = allBusinessCards[msg.sender];
        _businessCard.fullName = _fullName;
        _businessCard.title = _title;
        _businessCard.email = _email;
        _businessCard.phoneNumber = _phoneNumber;
        allBusinessCards[msg.sender] = _businessCard;
        emit UpdateBusinessCard(
            msg.sender,
            _fullName,
            _title,
            _email,
            _phoneNumber
        );
    }

    function addSocialLink(string memory _name, string memory _link) public {
        socialLinksCount += 1;
        socialLinks[msg.sender].push(
            SocialLink(socialLinksCount, _name, _link)
        );
        emit AddSocialLink(msg.sender, socialLinksCount, _name, _link);
    }

    function updateSocialLink(
        uint256 _id,
        string memory _name,
        string memory _link
    ) public {
        require(_id > 0);
        for (uint256 i = 0; i < socialLinks[msg.sender].length - 1; i++) {
            if (socialLinks[msg.sender][i].id == _id) {
                SocialLink memory _socialLink = socialLinks[msg.sender][i];
                _socialLink.name = _name;
                _socialLink.link = _link;
                socialLinks[msg.sender][i] = _socialLink;
                emit UpdateSocialLink(msg.sender, _id, _name, _link);
            }
        }
    }

    function removeSocialLink(uint256 _id) public {
        require(_id < socialLinks[msg.sender].length);
        for (uint256 i = 0; i < socialLinks[msg.sender].length - 1; i++) {
            if (socialLinks[msg.sender][i].id == _id) {
                delete socialLinks[msg.sender][i];
                socialLinks[msg.sender][i] = socialLinks[msg.sender][
                    socialLinks[msg.sender].length - 1
                ];
                socialLinks[msg.sender].pop();
                socialLinksCount -= 1;
                emit RemoveSocialLink(msg.sender, _id);
            }
        }
    }

    function addContact(address _contact) public {
        require(allBusinessCards[_contact].owner != address(0x0));
        contactsCount += 1;
        BusinessCard memory _contactBusinessCard = allBusinessCards[_contact];
        contacts[msg.sender].push(_contactBusinessCard.owner);
        emit AddContact(msg.sender, _contactBusinessCard.owner);
    }

    function removeContact(address _contact) public {
        require(allBusinessCards[_contact].owner != address(0x0));
        for (uint256 i = 0; i < contacts[msg.sender].length - 1; i++) {
            if (contacts[msg.sender][i] == _contact) {
                delete contacts[msg.sender][i];
                contacts[msg.sender][i] = contacts[msg.sender][
                    contacts[msg.sender].length - 1
                ];
                contacts[msg.sender].pop();
                contactsCount -= 1;
                emit RemoveContact(msg.sender, _contact);
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
        return contacts[msg.sender];
    }
}
