terraform {
  backend "gcs" {
    bucket = "pomodoro-together-tfstate"
  }
}
