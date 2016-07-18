
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Alex-Laptop
 */
public class Service
{    
    public static File[] listAllMovies(File folder)
    {
        for (File f : folder.listFiles())
        {
            if (f.isDirectory() && f.getName().equals("Movies"))
            {
                return f.listFiles();
            }
        }
        
        return null;
    }
    
    public static File[] listAllSeries(File folder)
    {        
        for (File f : folder.listFiles())
        {
            if (f.isDirectory() && f.getName().equals("Series"))
            {
                return f.listFiles();
            }
        }
        
        return null;
    }
    
    public static List<File> listAllEpisodes(File folder)
    {
        List<File> episodes = new ArrayList();
        
        for (File f : folder.listFiles())
        {
            if (f.isDirectory())
            {
                episodes.addAll(listAllEpisodes(f));
            }
            else if (!f.isHidden())
            {
                episodes.add(f);
            }
        }
        
        
        return episodes;
    }
}
