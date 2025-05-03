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