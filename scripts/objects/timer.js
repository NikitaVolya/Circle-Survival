

const TimerBuilder = {
    CreateTimer(f, time) {
        return {
            executeFunction: f,
            executeTimer: time,

            WhenDie() {},

            Update() {
                if (this.executeTimer <= 0)
                {
                    this.executeFunction();
                    Game.timers.Remove(this);
                }
                this.executeTimer -= Game.deltaTime;
            }
        }
    }
}