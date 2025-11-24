import Cards from "./Cards";

function Projects() {
  return (
    <div className="flex flex-col py-20 w-full px-8 gap-2 text-black dark:text-white">
     
      <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
        Recent Projects
      </h1>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
       
        <Cards
          title="Cryptify"
          description="A next-gen Web3 payment dApp for secure crypto transfers with personalized usernames and smart work commitments."
          techStack={["React", "Tailwind CSS", "Solidity"]}
          liveDemo="https://cryptify-defi.vercel.app/"
          image="https://i.ibb.co/HyxjJjr/118shots-so.png"
        />
        <Cards
          title="PayPact"
          description="A decentralized dApp on Solana that simplifies and secures group payments using on-chain 'pacts' for transparency."
          techStack={["Solana", "Web3Auth", "React"]}
          liveDemo="https://github.com/dhruv457457/paypact"
          image="https://i.ibb.co/4gP7YBBp/787shots-so.png"
        />
        <Cards
          title="HackZen"
          description="A comprehensive hackathon management system designed to streamline event organization and participation."
          techStack={["MERN Stack", "Socket.io"]}
          liveDemo="https://github.com/Nitinjainn/Devora"
          image="https://i.ibb.co/QFJc9Qc6/70shots-so.png"
        />
        <Cards
          title="Virtual Herbal Garden"
          description="A web app helping users explore a variety of herbs, their uses, and benefits, built with React and Firebase."
          techStack={["React", "Firebase", "MongoDB"]}
          liveDemo="https://ayurherb.vercel.app/"
          image="https://i.ibb.co/Cpmzbjyw/768shots-so.png"
        />
      </div>
    </div>
  );
}

export default Projects;