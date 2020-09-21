resource "google_cloudbuild_trigger" "terraform-plan" {
  provider = google-beta

  name        = "terraform-plan"
  description = "Run terraform plan in Pull Request"

  included_files = [
    "force-update-all-services.txt",
    "terraform/gcp/**",
    "scripts/terraform/**",
  ]

  filename = "terraform/gcp/cloudbuild/plan.yaml"

  github {
    owner = "yuyuyuya0319"
    name  = "pomodoro-together"

    pull_request {
      branch = ".*"
    }
  }
}

resource "google_cloudbuild_trigger" "terraform-apply" {
  provider = google-beta

  name        = "terraform-apply"
  description = "Run terraform apply when merged into main"

  included_files = [
    "force-update-all-services.txt",
    "terraform/gcp/**",
    "scripts/terraform/**",
  ]

  filename = "terraform/gcp/cloudbuild/apply.yaml"

  github {
    owner = "yuyuyuya0319"
    name  = "pomodoro-together"

    push {
      branch = "^main$"
    }
  }
}
