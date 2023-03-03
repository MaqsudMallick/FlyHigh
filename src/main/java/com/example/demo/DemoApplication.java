package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.core.io.Resource;
import java.util.*;
import java.util.stream.Collectors;
import java.io.*;
class Time{
  int hour;
  int min;
  boolean am;
  public Time(int hour, int min, boolean am){
    if(0<=hour && hour<=11 && 0<=min && min<=59){
      this.hour = hour;
      this.min = min;
      this.am = am;
    }
    else {
      this.hour = 0;
      this.min = 0;
      this.am = false;
    }
  }
  public String displaytime(){
    String s;
    if(am)  s = "AM";
    else s = "PM";
    return String.format("%d:%d %s", hour, min, s);
  }
}
class Flight{
  String depcity;
  String arrcity;
  Time time;
  int legs;
  public Flight(String depcity,String arrcity,Time time,int legs){
    this.depcity = depcity;
    this.arrcity = arrcity;
    this.time = time;
    this.legs = legs;
  }
  public boolean equal(String src, String dst){
    if(src.equals(depcity) && dst.equals(arrcity))
      return true;
    return false;
  }
  public boolean equal(String src){
    if(src.equals(depcity))
      return true;
    return false;
  }
  public String displayflight(){
    return String.format("Departure City: %s, Arrival City: %s, Time: %s, Legs: %d", depcity, arrcity, time.displaytime(), legs);
  }
}
class Response {
  private String token;
  public String gettoken() {
    return token;
  }
  public void settoken(String token) {
    this.token = token;
  }
}
class User {
  private String username;
  private String password;
  private String location;
  public User(String request){
    this.username = request.split("\"")[3];
    this.password = request.split("\"")[7];
    this.location = request.split("\"")[11];
  }
  public String getusername() {
    return username;
  }
  public void setusername(String username){
    this.username = username;
  }
  public String getpassword(){
    return password;
  }
  public void setpassword(String password){
    this.password = password;
  }
  public String getlocation() {
    return location;
  }
  public void setlocation(String location){
    this.location = location;
  }
  public boolean isequals(User u){
    return u.getusername().equals(this.username);
  }
}

class Flights{
  List<Flight> flights;
  public Flights(){
    try{
      flights = new ArrayList<Flight>();
        InputStream resource = new ClassPathResource("flightdata.txt").getInputStream();
       BufferedReader reader = new BufferedReader(new InputStreamReader(resource));
        String[] flights = reader.lines().collect(Collectors.joining("\n")).split("\n");
        for(int i=0; i<flights.length; i++){
          String[] flight = flights[i].split(" ");
          String[] time = flight[2].split(":");
          this.flights.add(new Flight(flight[0], flight[1], new Time(Integer.parseInt(time[0]), Integer.parseInt(time[1]), flight[3].equals("AM")), Integer.parseInt(flight[4])));
        }
    }
    catch(Exception e){
      e.printStackTrace();
    }
   }
  public String search(String src, String dst){
    return flights.stream().filter(flight -> flight.equal(src, dst)).reduce("", (a, b) -> a+b.displayflight()+"<br />", (a, b) -> a+b);
  }
  public String searchAll(String src){
    return flights.stream().filter(flight->flight.equal(src)).reduce("", (a, b) -> a+b.displayflight()+"<br />", (a, b) -> a+b);
  }
}
@SpringBootApplication
@RestController
public class DemoApplication {
    Flights fl;
    List<User> users;
    public DemoApplication(){
      fl = new Flights();
      users = new ArrayList<User>();
    }
    public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search")
    @ResponseBody
    public Response search(@RequestParam(value = "s", defaultValue = "Kolkata") String src, @RequestParam(value = "d", defaultValue= "") String dest) {
      System.out.println("Search request\nSource ="+ src+", Destination ="+dest);
      String result = fl.search(src, dest);
      if(dest.equals("")) result = fl.searchAll(src);
      if(result.equals("")) result =  "No flights found";
      Response r = new Response();
      r.settoken(result);
      return r;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    @ResponseBody
    public Response login(@RequestBody String request) {
      Response r = new Response();
      System.out.println(request.split("\"")[3]);
      User u = new User(request);
      System.out.println(request.split("\"")[7]);
      System.out.println(u.getusername());
      if(users.stream().filter(e -> e.isequals(u)).count()!=0)
          r.settoken("false");
      else{
          r.settoken("true");
           System.out.println("New User: " + u.getusername());
          users.add(u);
      }
      return r;
    }

}
//departure city, time, arrival city