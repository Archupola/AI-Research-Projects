import os
from openai import OpenAI
from env import BugFixEnv

# -------------------------
# Required Environment Variables
# -------------------------
API_BASE_URL = os.getenv("API_BASE_URL", "https://api.openai.com/v1")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4.1-mini")
HF_TOKEN = os.getenv("HF_TOKEN")

if HF_TOKEN is None:
    raise ValueError("HF_TOKEN environment variable is required")

# Initialize OpenAI client
client = OpenAI(
    base_url=API_BASE_URL,
    api_key=HF_TOKEN
)

# -------------------------
# Generate Action using LLM
# -------------------------
def get_action(prompt):
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=150
        )
        return response.choices[0].message.content.strip()
    except Exception:
        return "printf(\"error\");"

# -------------------------
# MAIN EXECUTION
# -------------------------
def main():
    env = BugFixEnv()

    task_name = "bug_fix"
    benchmark = "BugFixEnv"

    obs = env.reset()
    buggy_code = obs["buggy_code"]

    print(f"[START] task={task_name} env={benchmark} model={MODEL_NAME}", flush=True)

    rewards = []
    max_steps = 3
    done = False

    for step in range(1, max_steps + 1):
        prompt = f"Fix the following C code:\n{buggy_code}"

        action = get_action(prompt)

        obs, reward, done, info = env.step(action)

        rewards.append(reward)

        print(f"[STEP] step={step} action={action} reward={reward:.2f} done={str(done).lower()} error=null", flush=True)

        if done:
            break

    success = rewards[-1] >= 0.7 if rewards else False

    score = sum(rewards)
    rewards_str = ",".join(f"{r:.2f}" for r in rewards)

    print(f"[END] success={str(success).lower()} steps={len(rewards)} score={score:.2f} rewards={rewards_str}", flush=True)


if __name__ == "__main__":
    main()