// SPDX-License-Identifier: BSL-1.1
pragma solidity ^0.8.19;

contract ConditionalRegistry {
    struct Entry {
        address owner;
        string ipfsHash;
        uint256 expiry;
        bool deleted;
    }

    mapping(uint256 => Entry) public entries;
    uint256 public nextId;

    event Registered(uint256 indexed id, address indexed owner, string ipfsHash, uint256 expiry);
    event Deleted(uint256 indexed id);

    function register(string memory ipfsHash, uint256 expiry) external {
        entries[nextId] = Entry(msg.sender, ipfsHash, expiry, false);
        emit Registered(nextId, msg.sender, ipfsHash, expiry);
        nextId++;
    }

    function deleteEntry(uint256 id) external {
        require(msg.sender == entries[id].owner, "Not owner");
        require(!entries[id].deleted, "Already deleted");
        entries[id].deleted = true;
        emit Deleted(id);
    }

    function getEntry(uint256 id) external view returns (Entry memory) {
        return entries[id];
    }
}
