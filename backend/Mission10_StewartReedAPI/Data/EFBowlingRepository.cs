using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Mission10_StewartReedAPI.Data
{
    public class EFBowlingRepository : IBowlingRepository
    {
        private BowlingLeagueContext _bowlingContext;
        public EFBowlingRepository(BowlingLeagueContext temp)
        {
            _bowlingContext = temp;
        }

        IEnumerable<Bowler> IBowlingRepository.Bowlers => _bowlingContext.Bowlers;
        IEnumerable<Team> IBowlingRepository.Teams => _bowlingContext.Teams;
    }
}
