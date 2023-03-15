#include <bits/stdc++.h>
using namespace std;

int main(){
    vector<string> v = {"Mumbai", "Delhi", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Lucknow", "Surat", "Pune", "Jaipur"}; 
    srand(time(0));
    FILE *fp;
    fp = fopen("flightdata.txt", "w");
    for(int i=0; i<1e5; i++){
        int departure_city = (int)(rand()%v.size());
        int arrival_city = (int)(rand()%v.size());
        int hr = (int)(rand()%12);
        int min = (int)(rand()%60);
        string *am;
        if((int)(rand()%2)) am = new string("AM");
        else am = new string("PM");
        int legs = (int)(rand()%4);
        if(departure_city==arrival_city) arrival_city = 0;
        // printf("%s", am);
        fprintf(fp, "%s %s %d:%d %s %d\n", v[departure_city].c_str(), v[arrival_city].c_str(), hr, min, (*am).c_str(), legs);
    }
    fclose(fp);

}