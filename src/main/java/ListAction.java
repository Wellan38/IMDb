
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.File;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Alex-Laptop
 */
public class ListAction extends Action
{
    @Override
    public void execute(HttpServletRequest request, PrintWriter out, File folder) {
        
        try
        {
            String type = request.getParameter("type");
            
            JsonArray list = new JsonArray();
            
            switch(type)
            {
                case "movie":
                    File[] movies = Service.listAllMovies(folder);
                    
                    for (int i = 0; i < movies.length; i++)
                    {
                        JsonObject m = new JsonObject();
                        m.addProperty("title", movies[i].getName());
                        list.add(m);
                    }
                    
                    break;
                    
                case "series":
                    File[] series = Service.listAllSeries(folder);
                    
                    for (int i = 0; i < series.length; i++)
                    {
                        JsonObject m = new JsonObject();
                        m.addProperty("title", series[i].getName());
                        list.add(m);
                    }
                    
                    break;
                    
                case "episode":
                    String series_title = request.getParameter("series");
                    
                    folder = new File(folder.getAbsolutePath() + "\\Series\\" + series_title);
                    
                    List<File> episodes = Service.listAllEpisodes(folder);
                    
                    for (File f : episodes)
                    {
                        JsonObject episode = new JsonObject();
                        
                        String title = f.getName().split(" - ")[0];
                        
                        episode.addProperty("title", series_title + " - " + title);
                        
                        list.add(episode);
                    }
                    
                    break;
            }
            
            JsonObject container = new JsonObject();
            
            container.add("list", list);
            
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(container);
            out.println(json);
        }
        catch(Exception e)
        {
            throw e;
        }
    }
}
