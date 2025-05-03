import { BlockchainAPI } from '@line/blockchain-sdk';

class LineBlockchainService {
  private api: BlockchainAPI;

  constructor() {
    this.api = new BlockchainAPI({
      apiKey: process.env.EXPO_PUBLIC_LINE_BLOCKCHAIN_API_KEY!,
      apiSecret: process.env.EXPO_PUBLIC_LINE_BLOCKCHAIN_API_SECRET!,
      baseURL: process.env.EXPO_PUBLIC_LINE_BLOCKCHAIN_API_URL
    });
  }

  async mintNFT(metadata: NFTMetadata) {
    try {
      const response = await this.api.nft.mint({
        ownerAddress: process.env.EXPO_PUBLIC_LINE_BLOCKCHAIN_CONTRACT_OWNER!,
        contractId: process.env.EXPO_PUBLIC_LINE_BLOCKCHAIN_CONTRACT_ID!,
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
        contractId: process.env.EXPO_PUBLIC_LINE_BLOCKCHAIN_CONTRACT_ID!,
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
        contractId: process.env.EXPO_PUBLIC_LINE_BLOCKCHAIN_CONTRACT_ID!,
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

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export const generateNFTMetadata = (
  projectTitle: string,
  completionDate: string,
  totalLocations: number,
  imageUrl: string
): NFTMetadata => {
  return {
    name: `${projectTitle} Completion NFT`,
    description: `This NFT certifies the completion of all locations in the "${projectTitle}" project.`,
    image: imageUrl,
    attributes: [
      {
        trait_type: "Project",
        value: projectTitle
      },
      {
        trait_type: "Completion Date",
        value: completionDate
      },
      {
        trait_type: "Total Locations",
        value: totalLocations
      }
    ]
  };
};