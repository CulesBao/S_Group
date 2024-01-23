#include <bits/stdc++.h>
using namespace std;
 
typedef long long ll;
typedef double db;	 
#define for(i,a,b) for (int i = a; i <= b; i++)
#define pub push_back;
#define pob pop_back;
#define sz size();
 
ll n, t, x;
ll a[20000001];

ll tof(ll w)
{
	ll tmp = 0;
	for(i, 1, n)
		if (w > a[i])
			tmp += w - a[i];
	return tmp <= x;
}

int main()
{
	// freopen("DuLieu.inp", "r", stdin);
  	// freopen("Dulieu.out", "w", stdout);
	cin >> t;
	while (t--)
	{
		cin >> n >> x;
		for(i,1,n)
			cin >> a[i];
		ll l = 0, r = 1e10, ans;
		while (l <= r)
		{
			ll mid = (l + r) / 2;
			if (tof(mid))
			{
				ans = mid;
				l = mid + 1;
			}
			else	
				r = mid - 1;
		}
		cout << ans << endl;
	}
}
