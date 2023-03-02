package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.ClassPathResource;
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
  public String displayflight(){
    return String.format("Departure City: %s, Arrival City: %s, Time: %s, Legs: %d", depcity, arrcity, time.displaytime(), legs);
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
    return flights.stream().filter(flight -> flight.equal(src, dst)).reduce("", (a, b) -> a+b.displayflight()+"<br>", (a, b) -> a+b);
  }
}
@SpringBootApplication
@RestController
public class DemoApplication {
    Flights fl;
    public DemoApplication(){
      fl = new Flights();
    }
    public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
    }
    @GetMapping("/search")
    public String search(@RequestParam(value = "s", defaultValue = "Kolkata") String src, @RequestParam(value = "d", defaultValue= "Delhi") String dest) {
      String result = fl.search(src, dest);
      if(result.equals("")) return "No flights found";
      else return result;
    }
}
//departure city, time, arrival city