import { BlockchainAPI } from '@line/blockchain-sdk';

export class LineBlockchainService {
  private api: BlockchainAPI;

  constructor() {
    this.api = new BlockchainAPI({
      apiKey: process.env.LINE_BLOCKCHAIN_API_KEY!,
      apiSecret: process.env.LINE_BLOCKCHAIN_API_SECRET!,
      baseURL: process.env.LINE_BLOCKCHAIN_API_URL
    });
  }

  async mintNFT(metadata: any) {
    try {
      const response = await this.api.nft.mint({
        ownerAddress: process.env.LINE_BLOCKCHAIN_CONTRACT_OWNER!,
        contractId: process.env.LINE_BLOCKCHAIN_CONTRACT_ID!,
        tokenType: 'LN_NFT',
        name: metadata.name,
        description: metadata.description,
        metadata: metadata,
        ownershipTransferable: true
      });

      return response;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  }

  async transferNFT(toAddress: string, tokenId: string) {
    try {
      const response = await this.api.nft.transfer({
        contractId: process.env.LINE_BLOCKCHAIN_CONTRACT_ID!,
        tokenId,
        toAddress
      });

      return response;
    } catch (error) {
      console.error('Error transferring NFT:', error);
      throw error;
    }
  }

  async getNFTMetadata(tokenId: string) {
    try {
      const response = await this.api.nft.getTokenMetadata({
        contractId: process.env.LINE_BLOCKCHAIN_CONTRACT_ID!,
        tokenId
      });

      return response;
    } catch (error) {
      console.error('Error getting NFT metadata:', error);
      throw error;
    }
  }
}

export const lineBlockchain = new LineBlockchainService();