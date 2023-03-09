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
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.io.*;


class Time{
  int hour;
  int min;
  boolean am;
  public Time(int hour, int min, boolean am){
    if(0<=hour && hour<=12 && 0<=min && min<=59){
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
  public Flights(int v){
    flights = new ArrayList<Flight>();
  }
  public String search(String src, String dst){
    return flights.stream().filter(flight -> flight.equal(src, dst)).reduce("", (a, b) -> a+b.displayflight()+"<br />", (a, b) -> a+b);
  }
  public String searchAll(String src){
    return flights.stream().filter(flight->flight.equal(src)).reduce("", (a, b) -> a+b.displayflight()+"<br />", (a, b) -> a+b);
  }
  public String getAll(){
    return flights.stream().reduce("", (a, b) -> a+b.displayflight() + "<br />", (a, b)-> a+b);
  }
  public void addflight(Flight t){
    flights.add(t);
    System.out.println("Spcial Entry List:");
    flights.stream().forEach(e->System.out.println(e.displayflight()));
  }
}
@SpringBootApplication
@RestController
public class DemoApplication {
    Flights fl;
    Flights special;
    List<User> users;
    public DemoApplication(){
      fl = new Flights();
      special = new Flights(0);
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
    @GetMapping("/admin")
    public String admin(@RequestParam(value = "p") String password){
      String adminpassword = "xxx";
      if(password.equals(adminpassword)){
       return "<form action=/submitspecial method=POST><label for=departure>Departure city</label><input id=departure name=source required><label for=arrival>Arrival city</label><input id=arrival name=goal required><label for=time>TIme</label><input id=time name=time required type=time><label for=legs>Legs</label><input id=legs name=legs type=number max=9 min=0> <input type=submit></form>";
      }
      else return "Wrong Password";
    }
    @CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
    @PostMapping("/submitspecial")
    @ResponseBody
    public Response specialentry(@RequestBody String request){
      Response r = new Response();
      System.out.println("Special entry request: " + request);
      String[] params = request.split("&");
      String[] hrmin =  params[2].split("=")[1].split("%3A");
      int hr = Integer.parseInt(hrmin[0]);
      int min = Integer.parseInt(hrmin[1]);
      boolean am = true;
      if(hr>=12) { am = false; hr-=12;}
      else if(hr==0) hr=12;  
      Time time = new Time(hr, min, am);
      Flight t  = new Flight(params[0].split("=")[1],
                             params[1].split("=")[1],
                             time,
                             Integer.parseInt(params[3].split("=")[1]) );
      System.out.println(request.split("\"")[0]);
      special.addflight(t);
      r.settoken("success");
      return r;
    }
    @CrossOrigin(origins = {"http://localhost:3000","http://localhost:3006"})
    @GetMapping("/speciallist")
    @ResponseBody
    public Response getspeciallist(){
      Response r = new Response();
      r.settoken(special.getAll());
      return r;
    }

}
//departure city, time, arrival city