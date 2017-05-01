/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.pacm.services;

import edu.eci.arsw.pacm.model.Player;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author User
 */
public interface PacmServices {
    
    public void registrarJugadorAtacante(int salanum,Player p) throws ServicesException;
    
    public void registrarJugadorProtector(int salanum,Player p) throws ServicesException;
    
    public List<Player> getAtacantes(int salanum) throws ServicesException;
    
    public List<Player> getProtectores(int salanum) throws ServicesException;
    
    public String[][] getTablero() throws ServicesException;
    
    public int getSalaDisponible() throws ServicesException;
    
    public void setSalaDisponible(int sala) throws ServicesException;
    
    public ConcurrentHashMap<String, String> getIdentificadores()throws ServicesException;
}
