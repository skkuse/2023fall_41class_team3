__all__ = ["calculate_energy_needed", "calculate_carbon_footprint"]


def calculate_energy_needed(
    runtime: float,
    core_power_draw: float,
    usage: float,
    memory_power_draw: float,
    PUE: float,
    PSF: float,
) -> float:
    """Calculate total energy required

    Args:
        runtime (float): The runtime of the code (hr)
        core_power_draw (float): Thermal design power of CPU (Watt)
        usage (float): The usage percentage of the CPU (Between 0 and 1)
        memory_power_draw (float):
        PUE (float): Efficiency coefficient of the data center
        PSF (float): Pragmatic scaling factor

    Returns:
        A floating point value of the total energy required of the code
    """
    return runtime * (core_power_draw * usage + memory_power_draw) * PUE * PSF


def calculate_carbon_footprint(energy_needed: float, carbon_intensity: float) -> float:
    """Calculate carbon footprint"""
    return energy_needed * carbon_intensity
