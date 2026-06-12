// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AuditRegistry
 * @dev Stores smart contract audit proofs on-chain for the Mantle Network.
 */
contract AuditRegistry {
    struct AuditRecord {
        bytes32 contractHash;    // keccak256 of the audited source code
        bytes32 reportHash;      // keccak256 of the full JSON audit report
        uint8   riskScore;       // 0-100, lower = safer
        uint32  issueCount;      // total issues found
        uint32  criticalCount;   // critical severity issues
        uint64  timestamp;       // block timestamp
        address submitter;       // who submitted this audit
        string  ipfsCid;         // optional IPFS CID for full report
    }

    // Mapping from auditId (keccak256 hash) to AuditRecord
    mapping(bytes32 => AuditRecord) public audits;
    
    // Mapping from contractHash to the latest auditId
    mapping(bytes32 => bytes32) public latestAudit;
    
    // Mapping from submitter address to their list of auditIds
    mapping(address => bytes32[]) public submitterAudits;
    
    // Total number of audits registered
    uint256 public totalAudits;

    event AuditSubmitted(
        bytes32 indexed auditId, 
        bytes32 indexed contractHash, 
        address indexed submitter, 
        uint8 riskScore, 
        uint32 issueCount, 
        uint32 criticalCount, 
        uint64 timestamp
    );

    error InvalidHash();
    error InvalidRiskScore();

    /**
     * @dev Submits a new audit proof to the registry.
     */
    function submitAudit(
        bytes32 contractHash, 
        bytes32 reportHash, 
        uint8 riskScore, 
        uint32 issueCount, 
        uint32 criticalCount, 
        string calldata ipfsCid
    ) external returns (bytes32 auditId) {
        if (contractHash == bytes32(0)) revert InvalidHash();
        if (reportHash == bytes32(0)) revert InvalidHash();
        if (riskScore > 100) revert InvalidRiskScore();

        // Generate unique auditId
        auditId = keccak256(abi.encodePacked(
            contractHash, 
            reportHash, 
            msg.sender, 
            block.timestamp, 
            totalAudits
        ));

        // Create record
        audits[auditId] = AuditRecord({
            contractHash: contractHash,
            reportHash: reportHash,
            riskScore: riskScore,
            issueCount: issueCount,
            criticalCount: criticalCount,
            timestamp: uint64(block.timestamp),
            submitter: msg.sender,
            ipfsCid: ipfsCid
        });

        // Update lookups
        latestAudit[contractHash] = auditId;
        submitterAudits[msg.sender].push(auditId);
        totalAudits++;

        emit AuditSubmitted(
            auditId, 
            contractHash, 
            msg.sender, 
            riskScore, 
            issueCount, 
            criticalCount, 
            uint64(block.timestamp)
        );
    }

    /**
     * @dev Verifies if a contract hash has been audited.
     */
    function verifyContract(bytes32 contractHash) external view returns (
        bool exists, 
        bytes32 auditId, 
        uint8 riskScore, 
        uint64 timestamp
    ) {
        auditId = latestAudit[contractHash];
        if (auditId == bytes32(0)) return (false, bytes32(0), 0, 0);
        
        AuditRecord memory r = audits[auditId];
        return (true, auditId, r.riskScore, r.timestamp);
    }

    /**
     * @dev Returns all audit IDs for a specific submitter.
     */
    function getSubmitterAudits(address submitter) external view returns (bytes32[] memory) {
        return submitterAudits[submitter];
    }
}
