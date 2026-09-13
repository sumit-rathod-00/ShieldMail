class BaseTrainer:
    def __init__(self, job_id, model_name):
        self.job_id = job_id
        self.model_name = model_name

    def run_training(self):
        print(f"Starting training job {self.job_id} for model {self.model_name}")
        # Placeholder for training logic
        pass

    def get_status(self):
        return "RUNNING"
