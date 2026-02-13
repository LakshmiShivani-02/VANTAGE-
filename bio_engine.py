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
        """Generates distinct levels of intelligence for a country."""
        
        # 1. Profile Generator (High-level / Subject A)
        random.seed(f"{country_name}_profile")
        profile_template = random.choice(self.QUALITIES)
        profile_bio = profile_template.format(
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
        profile_note = random.choice(self.AGENT_NOTES).format(
            security=random.choice(self.SECURITIES),
            activity=random.choice(self.ACTIVITIES),
            strategy=random.choice(self.STRATEGIES),
            status=random.choice(self.STATUSES),
            actor=random.choice(self.ACTORS)
        )

        # 2. Dossier Generator (Tactical / Subject B)
        # Use a different salt for the seed
        random.seed(f"{country_name}_dossier_secret_x92")
        dossier_template = random.choice(self.QUALITIES)
        dossier_bio = dossier_template.format(
            sector=random.choice(self.SECTORS),
            asset=random.choice(self.ASSETS),
            innovation=random.choice(self.INNOVATIONS),
            hub=random.choice(self.HUBS),
            diplomacy=random.choice(self.DIPLOMACY),
            influence=random.choice(self.INFLUENCE),
            tradition="hidden underground roots",
            modernity="advanced signal-intelligence",
            region=random.choice(self.REGIONS),
            market=random.choice(self.MARKETS)
        )
        dossier_note = "CLASSIFIED ADDENDUM: " + random.choice(self.AGENT_NOTES).format(
            security=random.choice(self.SECURITIES),
            activity=random.choice(self.ACTIVITIES),
            strategy=random.choice(self.STRATEGIES),
            status=random.choice(self.STATUSES),
            actor=random.choice(self.ACTORS)
        )
        
        # UAE Specific Overrides
        if country_code == "ARE":
            profile_bio = "Specializes in building the future out of sand and silicon. Known for having more cranes per square mile than anywhere else on Earth."
            profile_note = "Public Intel: Subject has successfully pivoted to a post-oil AI economy ahead of schedule."
            
            dossier_bio = "TACTICAL PROFILE: Operating as the primary node for 'Project Mirage'. Coordinates multi-layered sovereign wealth flows across 4 continents."
            dossier_note = "FIELD LOG 82-A: Unidentified high-bandwidth uplink detected near the Burj Khalifa research pods. Origin: unknown."

        return {
            "profile": {
                "text": profile_bio,
                "note": profile_note
            },
            "dossier": {
                "text": dossier_bio,
                "note": dossier_note
            }
        }

bio_engine = BioEngine()
