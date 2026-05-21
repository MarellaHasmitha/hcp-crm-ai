from sqlalchemy import Column, Integer, String

from database import Base


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcpName = Column(String)
    interactionType = Column(String)
    date = Column(String)
    time = Column(String)
    attendees = Column(String)
    topicsDiscussed = Column(String)
    materialsShared = Column(String)
    samplesDistributed = Column(String)
    sentiment = Column(String)
    outcomes = Column(String)
    followUpActions = Column(String)