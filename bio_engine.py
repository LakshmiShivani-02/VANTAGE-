import random

class BioEngine:
    """
    A simulated AI intelligence engine that generates unique country dossiers
    by synthesizing cultural, economic, and strategic markers.
    """
    
    QUALITIES = [
        "Specializes in {sector} and strategic {asset} reserves.",
        "A global hub for {innovation} and high-tech {hub}.",
        "Masters of tactical {diplomacy} and regional {influence}.",
        "Known for a unique blend of {tradition} and {modernity}.",
        "Strategically positioned as a gateway to {region}'s {market}."
    ]
    
    SECTORS = ["energy", "semiconductor", "maritime", "agricultural", "financial", "aerospace"]
    ASSETS = ["lithium", "helium", "rare-earth", "digital", "underwater", "orbital"]
    INNOVATIONS = ["quantum computing", "fusion research", "agri-tech", "deep-sea mining"]
    HUBS = ["archipelagos", "metropolises", "silicon valleys", "strategic corridors"]
    DIPLOMACY = ["neutrality", "interventionism", "economic leverage", "soft-power"]
    INFLUENCE = ["dominance", "mediation", "projection", "stability"]
    REGIONS = ["Eurasia", "the Indo-Pacific", "the Global South", "the Mediterranean"]
    MARKETS = ["emerging workforce", "resource nodes", "capital centers", "digital frontiers"]

    AGENT_NOTES = [
        "Agent Note: Subject has recently updated their {security} protocols.",
        "Warning: A suspicious spike in {activity} detected in the capital.",
        "Dossier Detail: Internal memos suggest a pivot toward {strategy}.",
        "Status: Subject is currently {status} in the Global Graph.",
        "Field Intel: Observed {actor} activity near strategic trade nodes."
    ]
    
    SECURITIES = ["encryption", "border", "maritime", "cyber-defense"]
    ACTIVITIES = ["satellite traffic", "encrypted pings", "diplomatic movement"]
    STRATEGIES = ["digital sovereignty", "resource hoarding", "non-alignment"]
    STATUSES = ["recalibrating", "ascending", "pivoting", "watching"]
    ACTORS = ["unidentified", "state-sponsored", "rogue signal", "high-influence"]

    def generate(self, country_name, country_code):
        """Generates a dynamic dossier for any country."""
        # Using a seed based on the country name to keep it consistent but unique
        random.seed(country_name)
        
        quality_template = random.choice(self.QUALITIES)
        bio = quality_template.format(
            sector=random.choice(self.SECTORS),
            asset=random.choice(self.ASSETS),
            innovation=random.choice(self.INNOVATIONS),
            hub=random.choice(self.HUBS),
            diplomacy=random.choice(self.DIPLOMACY),
            influence=random.choice(self.INFLUENCE),
            tradition="ancestral legacy",
            modernity="cyber-urbanization",
            region=random.choice(self.REGIONS),
            market=random.choice(self.MARKETS)
        )
        
        note_template = random.choice(self.AGENT_NOTES)
        note = note_template.format(
            security=random.choice(self.SECURITIES),
            activity=random.choice(self.ACTIVITIES),
            strategy=random.choice(self.STRATEGIES),
            status=random.choice(self.STATUSES),
            actor=random.choice(self.ACTORS)
        )
        
        # Override for UAE specifically as requested/discussed
        if country_code == "ARE":
            bio = "Specializes in building the future out of sand and silicon. Known for having more cranes per square mile than anywhere else on Earth."
            note = "Agent Note: Subject has successfully pivoted to a post-oil AI economy ahead of schedule."

        return {
            "bio": bio,
            "note": note
        }

bio_engine = BioEngine()
