import Cards from "./Cards";
import Cryptify from "../assets/Cryptify.png";

function Projects() {
  return (
    <div className="flex flex-col py-20 w-full px-8 gap-2 text-black">
      {/* Section Header - Aligned to the left */}
      <h1 className="text-lg text-gray-600 font-semibold">
        Recent Projects
      </h1>

      {/* Uniform Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* All projects now have the same size */}
        <Cards
          title="Cryptify"
          description="A next-gen Web3 payment dApp for secure crypto transfers with personalized usernames and smart work commitments."
          techStack={["React", "Tailwind CSS", "Solidity"]}
          liveDemo="https://cryptify-defi.vercel.app/"
          image={Cryptify}
        />
        <Cards
          title="PayPact"
          description="A decentralized dApp on Solana that simplifies and secures group payments using on-chain 'pacts' for transparency."
          techStack={["Solana", "Web3Auth", "React"]}
          liveDemo="https://github.com/dhruv457457/paypact"
          image="https://i.ibb.co/Cpr4bg6V/Screenshot-2025-09-29-232649.png"
        />
        <Cards
          title="Devora"
          description="A comprehensive hackathon management system designed to streamline event organization and participation."
          techStack={["MERN Stack", "Socket.io"]}
          liveDemo="https://github.com/Nitinjainn/Devora"
          image="https://i.ibb.co/qM8s974n/Screenshot-2025-09-29-232623.png"
        />
        <Cards
          title="Virtual Herbal Garden"
          description="A web app helping users explore a variety of herbs, their uses, and benefits, built with React and Firebase."
          techStack={["React", "Firebase", "MongoDB"]}
          liveDemo="https://ayurherb.vercel.app/"
          image="https://i.ibb.co/prKX52Sw/Screenshot-194.png"
        />
      </div>
    </div>
  );
}

export default Projects;