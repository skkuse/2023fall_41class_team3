const InformationComponent = () => {
  return (
    <>
      <h1 className="text-3xl tracking-wider mb-5">CodEco (Code + Eco)</h1>
      <p>
        <em>CodEco</em> is a project that aims to calculate the environmental
        impact of written software code. A large percentage of carbon emission
        comes from computing resources, and this will continue to grow, as
        software becomes more demanding for high performance tasks. Our website
        calculates the energy resources required to execute a small piece of
        software, therefore allowing the user to correctly analyze the code in
        an ecological perspective.
      </p>
      <br />
      <p>
        Our calculation follows the work of <em>Lannelongue, L. et. al.</em>
        [1], where the calculation for the carbon footprint and energy needed is
        as follows.
        <code className="block text-center">
          carbon footprint = energy needed * carbon intensity
        </code>
        <code className="block text-center">
          energy_needed = runtime * (power draw for cores * usage + power draw
          for memory) * PUE * PSF
        </code>
      </p>
      <br />
      <p>
        This project is done as an undergraduate project for{" "}
        <em>Introduction to Software Engineering</em> by 7 team members
        associated in Sungkyunkwan University, South Korea.
      </p>
      <br />

      <span>
        [1] Lannelongue, L., Grealey, J., Inouye, M., Green Algorithms:
        Quantifying the Carbon Footprint of Computation. Adv. Sci. 2021,
        2100707. https://doi.org/10.1002/advs.202100707
      </span>
    </>
  );
};

export default InformationComponent;
