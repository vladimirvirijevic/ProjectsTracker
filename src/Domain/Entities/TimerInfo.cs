namespace Domain.Entities
{
    public class TimerInfo
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int StartTime { get; set; }
        public bool TimerIsRunning { get; set; }
    }
}
