#!/usr/bin/python3
"""
Queries the Reddit API to get the number of subscribers for a given subreddit.
"""
import requests

def number_of_subscribers(subreddit):
    """Returns the number of subscribers for a given subreddit."""
    url = f"https://www.reddit.com/r/{subreddit}/about.json"
    headers = {'User-Agent': 'Mozilla/5.0'}  # Custom User-Agent header to avoid 429 Too Many Requests

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        try:
            data = response.json()
            subscribers = data['data']['subscribers']
            return subscribers
        except (KeyError, ValueError):
            return 0
    else:
        return 0

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print("Please pass an argument for the subreddit to search.")
    else:
        subreddit = sys.argv[1]
        print(number_of_subscribers(subreddit))

