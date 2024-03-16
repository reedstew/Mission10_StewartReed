using Microsoft.AspNetCore.Mvc;
using Mission10_StewartReedAPI.Data;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Mission10_StewartReedAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BowlingLeagueController : ControllerBase
    {
        private IBowlingRepository _bowlingRepository;

        public BowlingLeagueController(IBowlingRepository temp)
        {
            _bowlingRepository = temp;
        }

        [HttpGet("Bowler")]
        public IEnumerable <Bowler> GetBowler()
        {
            var bowlingData = _bowlingRepository.Bowlers
                .Where(bowler => bowler.TeamId == 1 || bowler.TeamId == 2)
                .ToArray();

            return bowlingData;
        }

        [HttpGet("Team")]
        public IEnumerable<Team> GetTeam()
        {
            var teamData = _bowlingRepository.Teams
                .Where(team => team.TeamName == "Marlins" || team.TeamName == "Sharks")
                .ToArray();

            return teamData;
        }
    }
}