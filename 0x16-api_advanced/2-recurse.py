#!/usr/bin/python3
"""
Recursively queries the Reddit API to gather all hot article titles for a given subreddit.
"""
import requests

def recurse(subreddit, hot_list=[]):
    """Recursively fetches all hot article titles for a given subreddit."""
    if not hot_list:
        hot_list = []
    url = f"https://www.reddit.com/r/{subreddit}/hot.json"
    headers = {'User-Agent': 'Mozilla/5.0'}  # Custom User-Agent header to avoid 429 Too Many Requests

    params = {'limit': 100}  # Maximum limit per page
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        try:
            data = response.json()
            posts = data['data']['children']
            
            for post in posts:
                hot_list.append(post['data']['title'])
            
            # Check for pagination
            after = data['data'].get('after')
            if after:
                # Recursively call with the 'after' parameter to get the next page
                recurse(subreddit, hot_list=hot_list)
            else:
                return hot_list
        except (KeyError, ValueError):
            return None
    else:
        return None

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print("Please pass an argument for the subreddit to search.")
    else:
        subreddit = sys.argv[1]
        result = recurse(subreddit)
        if result is not None:
            print(len(result))
        else:
            print("None")

