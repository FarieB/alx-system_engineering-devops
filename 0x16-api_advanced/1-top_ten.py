#!/usr/bin/python3
"""
Queries the Reddit API to print the titles of the first 10 hot posts for a given subreddit.
"""
import requests

def top_ten(subreddit):
    """Prints the titles of the first 10 hot posts for a given subreddit."""
    url = f"https://www.reddit.com/r/{subreddit}/hot.json?limit=10"
    headers = {'User-Agent': 'Mozilla/5.0'}

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        try:
            data = response.json()
            for post in data['data']['children']:
                print(post['data']['title'])
        except (KeyError, ValueError):
            print("None")
    else:
        print("None")

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print("Please pass an argument for the subreddit to search.")
    else:
        subreddit = sys.argv[1]
        top_ten(subreddit)

